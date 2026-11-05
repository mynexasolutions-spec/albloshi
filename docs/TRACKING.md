# Conversion tracking & attribution

Everything is routed through **one Google Tag Manager container**. The site only pushes events to
`dataLayer`; Google Ads, GA4, Meta Pixel and LinkedIn Insight are configured inside GTM (no code deploy
needed to add/change tags). Nothing third-party loads until the visitor clicks **Accept** in the cookie
banner (Consent Mode v2 defaults are `denied`).

## 1. One-time setup

1. Create a container at https://tagmanager.google.com (type: Web) → copy the ID `GTM-XXXXXXX`.
2. Vercel → Project → Settings → Environment Variables: `VITE_GTM_ID=GTM-XXXXXXX` (Production + Preview), then redeploy.
   (`VITE_` is fine here: GTM IDs are public. Never put API secrets in `VITE_` vars.)
3. Container → Admin → Container Settings → enable **Consent Overview**. For every ad/analytics tag below open
   *Advanced Settings → Consent Settings* and require `ad_storage` (ads/Meta/LinkedIn) or `analytics_storage` (GA4).

## 2. Events the site pushes

| dataLayer `event`   | When                                                    | Extra fields |
|---------------------|---------------------------------------------------------|--------------|
| `generate_lead`     | Contact form or `/lp/*` landing form submitted OK       | `lead_source`, `lead_service`, `currency`, `gclid`/`gbraid`/`wbraid`/`fbclid`/`li_fat_id`/`msclkid` (when present) |
| `click_to_call`     | Any `tel:` link clicked                                 | `page_path`, click IDs |
| `click_whatsapp`    | Any `wa.me` / `api.whatsapp.com` link clicked           | `page_path`, click IDs |
| `click_email`       | Any `mailto:` link clicked                              | `page_path`, click IDs |
| `virtual_page_view` | SPA navigation after the first page                     | `page_path`, `page_location`, `page_title` |

Phone numbers / emails are never sent. `/admin` is never tracked. Events are only pushed after the visitor has
accepted cookies, so nothing from before consent is replayed into ad platforms.

## 3. Create in GTM

**Triggers** (Custom Event): `generate_lead`, `click_to_call`, `click_whatsapp`, `click_email`, `virtual_page_view`.

**Tags**

| Tag | Type | Fires on |
|-----|------|----------|
| Conversion Linker | Conversion Linker | All Pages (stores gclid for Ads) |
| GA4 Config | Google tag, Measurement ID `G-…` | Initialization – All Pages (this is the first page view) |
| GA4 – virtual page view | GA4 Event `page_view` (params: `page_location`, `page_title`) | `virtual_page_view` |
| GA4 – generate_lead | GA4 Event `generate_lead` | `generate_lead` → mark as **Key event** in GA4 |
| GA4 – contact clicks | GA4 Event `{{Event}}` | `click_to_call`, `click_whatsapp`, `click_email` → mark key events |
| Google Ads – Lead | Google Ads Conversion Tracking (Conversion ID + Label from Ads → Goals → Conversions → New → Website) | `generate_lead` |
| Google Ads – Call/WhatsApp | same, separate label (count as a lower-value secondary conversion) | `click_to_call`, `click_whatsapp` |
| Google Ads Remarketing | Google Ads Remarketing | All Pages |
| Meta Pixel base | Custom HTML or "Facebook Pixel" template from the gallery, Pixel ID | All Pages |
| Meta – Lead | Meta event `Lead` | `generate_lead` |
| Meta – Contact | Meta event `Contact` | `click_to_call`, `click_whatsapp`, `click_email` |
| LinkedIn Insight | LinkedIn Insight Tag template, Partner ID | All Pages |
| LinkedIn – Lead conversion | LinkedIn conversion (create the conversion in Campaign Manager first) | `generate_lead` |

For the Meta / LinkedIn base tags to also track SPA navigations, add `virtual_page_view` as an extra firing trigger
(Meta: send `PageView`).

Use *Data Layer Variables* (`lead_source`, `lead_service`, `gclid`, …) if you want them as event parameters.
Optional: set a conversion value on the Ads lead conversion (e.g. 1 lead = estimated SAR value) so Smart Bidding can use tROAS.

## 4. Verify before spending budget

1. GTM → **Preview** → open the site → Accept cookies → submit a test lead on `/contact`.
   Tag Assistant must show `generate_lead` with your Ads / GA4 / Meta / LinkedIn tags **Fired**.
2. Click the floating WhatsApp button and a `tel:` link → `click_whatsapp` / `click_to_call` fire.
3. GA4 → Admin → DebugView shows `generate_lead`. Meta → Events Manager → Test Events. Ads → Conversions status becomes *Recording* (can take a few hours).
4. Reject cookies in a fresh private window → no requests to googletagmanager / facebook / licdn.
5. Test an ad-style URL: `/lp/chemicals?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=TEST123` → the lead's `source` in
   the admin shows `lp_chemicals:google/cpc/test`, and `generate_lead` carries `gclid`.

## 5. Ad destinations (message match)

Never point ads at the generic vertical or home pages. Use one `/lp/<slug>` page per ad group: no site navigation, one
form, headline/bullets/form wording specific to that offer (EN + AR, follows the visitor's language toggle). The pages are
`noindex`, so they do not compete with the organic pages.

| Ad group / keyword theme        | Final URL |
|---------------------------------|-----------|
| Basmati rice wholesale          | `/lp/rice` |
| Cooking / palm oil supply       | `/lp/palmoil` |
| General food supply (HoReCa)    | `/lp/food` |
| Water treatment chemicals       | `/lp/watertreatment` |
| TELLABS / specialty chemicals   | `/lp/chemicals` |
| Pipes, valves, flanges          | `/lp/industrial` |
| Manpower / labour supply        | `/lp/manpower` |

Always append UTMs, e.g. `?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}` (Ads auto-tagging adds `gclid`).
The campaign is saved on the lead (`source` = `lp_rice:google/cpc/...`), so the admin Leads view shows which campaign produced it.
Match the ad headline to the page `title`; to add a page, add an entry to `PAGES` and `FORM_COPY` in
`src/pages/LandingPage.jsx`, `ROUTES` in `scripts/prerender.mjs`, and the `lp_[a-z]{3,20}` source pattern already allows the slug.

## 6. Spam / fake-lead protection (`api/submit-lead.js`)

Layers, in order: honeypot field, mandatory minimum fill time (2.5 s), link-stuffed text dropped, consent required, per-IP
throttle (5 / 10 min), field validation, **CAPTCHA**, 10-minute duplicate check (email or phone), global cap (40 leads / 10 min).
Silently dropped submissions return `{ ok: true }` but **not** `recorded: true`, so the browser fires no `generate_lead`
conversion for them: spam and duplicates never reach Google Ads / Meta.

Do these once in Vercel (the code cannot do them for you):
1. **CAPTCHA:** set `CAPTCHA_SECRET` (random 64-hex string, server-side only) for the built-in proof-of-work, or the Turnstile pair
   `VITE_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (stronger; set both or neither). Without either, production logs
   `NO CAPTCHA CONFIGURED` on every submit and the form runs unprotected.
2. **Edge rate limit:** Vercel dashboard -> Firewall -> Add Rule: path equals `/api/submit-lead`, method POST, rate limit
   e.g. 10 requests / 1 minute per IP, action Deny. (The in-code throttle is per warm instance only; this one is global.)
3. Run `supabase/leads_lockdown.sql` once so the browser can never write to `leads` directly.
4. Google Ads: Conversion action -> Count = **One** for leads, and review Invalid clicks reporting; click fraud is filtered by Google, not by this site.

Known limits: the global cap also means a determined flood can briefly block real leads (they get a "try again in a few minutes"
message); the proof-of-work replay list is per warm instance. Turnstile + the Vercel rule close both.

## 7. Notes / known limits

- **Rejected-cookie visitors are not measured** (by design, the site loads no tags without consent). If you later want
  Google's cookieless modelled conversions, switch to "advanced" Consent Mode: load GTM always with the denied defaults.
  Get legal sign-off first.
- No `<noscript>` GTM iframe on purpose: it would load Google without consent.
- Browser-side tracking loses ~20-30% of conversions to ad blockers / ITP. Next step if needed: server-side GTM or Meta CAPI /
  Google Ads Enhanced Conversions, fed from `api/submit-lead.js` (hash email/phone server-side, never client-side secrets).
- CSP in `vercel.json` already allows the Google, Meta and LinkedIn domains. If you add another vendor (TikTok, Snap, Bing UET)
  add its script/connect domains there, otherwise the browser blocks it.
- Update the privacy policy (`src/pages/Legal.jsx`) if you add vendors beyond Google, Meta and LinkedIn.
