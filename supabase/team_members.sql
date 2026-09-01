-- Backing table for the "Team" admin CRUD panel
-- (src/pages/admin/AdminTeam.jsx, read by src/pages/About.jsx).
--
-- Run this manually in the Supabase SQL editor (Project > SQL Editor > New query)
-- before using the admin editor — until this table exists, the About page falls
-- back to the hardcoded defaults in src/lib/teamDefaults.js and fails silently.

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name_en text not null default '',
  name_ar text not null default '',
  role_en text not null default '',
  role_ar text not null default '',
  bio_en text not null default '',
  bio_ar text not null default '',
  categories text[] not null default '{}',
  image text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table team_members enable row level security;

create policy "Public read access" on team_members for select using (true);
create policy "Authenticated write access" on team_members for all using (auth.role() = 'authenticated');
