-- Lock down customer leads: the public (anon) key can never touch them, and being "signed in" is NOT enough.
-- Leads are CREATED by api/submit-lead.js (service-role key, server-side) and READ / UPDATED / DELETED
-- only by users listed in public.admin_users, from the dashboard.
--
-- Run manually in the Supabase SQL editor. Safe to re-run.
-- Run this AFTER deploying api/submit-lead.js with SUPABASE_SERVICE_ROLE_KEY set,
-- otherwise the contact form will stop working (it no longer inserts from the browser).
--
-- BEFORE running: create your admin user in Authentication > Users and put its email below.
-- The script ABORTS (and changes nothing) if admin_users would be empty, so you cannot lock yourself out.
-- Also disable public sign-ups: Authentication > Providers > Email > "Allow new users to sign up" = OFF.

-- STEP 1: who is an admin --------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;   -- only the SQL editor / service role can edit it

insert into public.admin_users (user_id)
select id from auth.users where lower(email) = lower('admin@albloshi.com')  -- <-- your admin login email
on conflict do nothing;

do $$
begin
  if not exists (select 1 from public.admin_users) then
    raise exception 'admin_users is empty: edit the email in STEP 1 to match a user in Authentication > Users, then re-run. Nothing was changed.';
  end if;
end $$;

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- STEP 2: leads ------------------------------------------------------------
alter table public.leads enable row level security;
alter table public.leads force row level security;

-- Remove every existing policy (including any old "anyone can insert" / "public read" / "any authenticated user" ones).
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'leads' loop
    execute format('drop policy %I on public.leads', p.policyname);
  end loop;
end $$;

-- Defense in depth: even if a permissive policy is added by mistake later,
-- anon has no table privileges at all, so PostgREST rejects the request outright.
revoke all on public.leads from anon;

-- Only admins (not merely signed-in users) can use the table.
create policy "Admin only" on public.leads
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Verify (run separately as anon via the API, expect 401/403): GET /rest/v1/leads?select=id
-- Next: run supabase/admin_only_policies.sql to apply the same rule to the content tables and blogs.
