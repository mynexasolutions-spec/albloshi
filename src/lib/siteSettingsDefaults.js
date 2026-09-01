// Default (fallback) contact/site info — shared across Footer, WhatsAppFloat, Contact
// page, and ManpowerSupply's hero phone pill. Used only when Supabase is unreachable
// or the `site_settings` row is missing — the live source of truth is managed at
// /admin/settings. See supabase/site_settings.sql for the backing table.

export const DEFAULTS = {
  phone: '+966543188882',
  phone_display: '+966 54 318 8882',
  whatsapp: '+966543188882',
  email_admin: 'admin@albloshi.co',
  email_sales: 'sales@albloshi.co',
  website: 'https://albloshi.co',
  address_line1_en: '5250, Al Nidal 7372, Ash Shulah Dist.,',
  address_line1_ar: '٥٢٥٠، النضال ٧٣٧٢، حي الشعلة،',
  address_line2_en: 'Dammam 34261, Kingdom of Saudi Arabia',
  address_line2_ar: 'الدمام ٣٤٢٦١، المملكة العربية السعودية',
  cr_number: '7049763092',
  national_address: 'EAPB5250',
};

export async function fetchSiteSettings(supabase) {
  if (!supabase) return DEFAULTS;
  try {
    const { data, error } = await supabase.from('site_settings').select('data').eq('key', 'contact').single();
    if (error || !data?.data) return DEFAULTS;
    return { ...DEFAULTS, ...data.data };
  } catch {
    return DEFAULTS;
  }
}
