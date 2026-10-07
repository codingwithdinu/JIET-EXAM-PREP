create table if not exists public.subject_drive_links (
  semester integer not null,
  branch text not null,
  subject_slug text not null,
  drive_url text,
  updated_at timestamptz not null default now(),
  primary key (semester, branch, subject_slug)
);

alter table public.subject_drive_links enable row level security;

create policy "public can read drive links"
on public.subject_drive_links for select
to anon, authenticated
using (true);

create policy "authenticated users can manage drive links"
on public.subject_drive_links for all
to authenticated
using (true)
with check (true);

-- IMPORTANT: after creating your admin Auth user, replace this broad
-- authenticated policy with an admin-only policy if other authenticated
-- users will ever exist in this Supabase project.
