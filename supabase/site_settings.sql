-- Backing table for the "Contact & Site Settings" admin panel
-- (src/pages/admin/AdminContactSettings.jsx, read by Footer.jsx, WhatsAppFloat.jsx,
-- Contact.jsx, and ManpowerSupply.jsx).
--
-- Single-row-per-key table — currently just one row, key='contact', holding the
-- shared phone/WhatsApp/email/address/CR-number values used across the site.
--
-- Run this manually in the Supabase SQL editor (Project > SQL Editor > New query)
-- before using the admin editor — until this table exists, all pages fall back to
-- the hardcoded defaults in src/lib/siteSettingsDefaults.js and fail silently.

create table if not exists site_settings (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "Public read access" on site_settings for select using (true);
create policy "Authenticated write access" on site_settings for all using (auth.role() = 'authenticated');
