-- Backing table for the vertical/service-page admin CMS
-- (src/pages/admin/AdminVertical.jsx, read by IndustrialServices.jsx / FoodServices.jsx /
-- IntelligentChemicals.jsx / ManpowerSupply.jsx).
--
-- One row per (page, section) — `page` is 'industrial' | 'food' | 'chemicals' | 'manpower',
-- `section` is 'hero' | 'stats' | 'products' | 'capabilities' | 'cta'.
--
-- Run this manually in the Supabase SQL editor (Project > SQL Editor > New query) before
-- using the admin editor — until this table exists, each vertical page falls back to its
-- hardcoded defaults in src/lib/verticalDefaults/*.js and fails silently.

create table if not exists vertical_content (
  page text not null,
  section text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (page, section)
);

alter table vertical_content enable row level security;

create policy "Public read access" on vertical_content for select using (true);
create policy "Authenticated write access" on vertical_content for all using (auth.role() = 'authenticated');
