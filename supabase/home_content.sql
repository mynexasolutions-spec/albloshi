-- Backing table for the "Home Page" admin customization panel
-- (src/pages/admin/AdminHomeContent.jsx, read by src/pages/Home.jsx).
--
-- Run this manually in the Supabase SQL editor (Project > SQL Editor > New query)
-- before using the admin editor — until this table exists, the app falls back
-- to the hardcoded defaults in src/lib/homeContentDefaults.js and fails silently.

create table if not exists home_content (
  section text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table home_content enable row level security;

create policy "Public read access" on home_content for select using (true);
create policy "Authenticated write access" on home_content for all using (auth.role() = 'authenticated');
