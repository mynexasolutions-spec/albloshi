-- Make "admin" mean something. Today every policy says auth.role() = 'authenticated',
-- so ANY signed-in Supabase user (e.g. someone who self-registers) can edit the whole site and read all leads.
-- This script limits writes (and the leads table) to the users listed in admin_users.
--
-- !! BEFORE running: make sure your admin user exists in Authentication > Users, then run STEP 1 and
-- !! confirm the SELECT at the end of it returns your row. If admin_users is empty when STEP 2 runs,
-- !! you will lock yourself out of the dashboard (you can still fix it from the SQL editor).
-- Safe to re-run.

-- STEP 1: who is an admin --------------------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;   -- only the SQL editor / service role can edit it

insert into public.admin_users (user_id)
select id from auth.users where lower(email) = lower('admin@albloshi.com')  -- <-- your admin login email
on conflict do nothing;

select * from public.admin_users;   -- must show at least one row before STEP 2

-- Safety net: abort before touching any policy if nobody is an admin (prevents locking yourself out).
do $$
begin
  if not exists (select 1 from public.admin_users) then
    raise exception 'admin_users is empty: edit the email in STEP 1 to match a user in Authentication > Users, then re-run. Nothing was changed.';
  end if;
end $$;

-- STEP 2: admin check + policies -------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$ select exists (select 1 from public.admin_users where user_id = auth.uid()); $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Content tables: everyone can read, only admins can write.
do $$
declare t text; p record;
begin
  foreach t in array array['home_content', 'site_settings', 'team_members', 'vertical_content'] loop
    execute format('alter table public.%I enable row level security', t);
    for p in select policyname from pg_policies where schemaname = 'public' and tablename = t loop
      execute format('drop policy %I on public.%I', p.policyname, t);
    end loop;
    execute format('create policy "Public read" on public.%I for select using (true)', t);
    execute format('create policy "Admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Leads: admins only (visitors submit through api/submit-lead.js with the service-role key).
alter table public.leads enable row level security;
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'leads' loop
    execute format('drop policy %I on public.leads', p.policyname);
  end loop;
end $$;
revoke all on public.leads from anon;
create policy "Admin only" on public.leads for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Blogs: public sees only published posts; admins see and edit everything.
alter table public.blogs enable row level security;
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'blogs' loop
    execute format('drop policy %I on public.blogs', p.policyname);
  end loop;
end $$;
create policy "Public read published" on public.blogs for select using (status = 'published' or public.is_admin());
create policy "Admin write" on public.blogs for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke insert, update, delete on public.blogs from anon;
