create extension if not exists pgcrypto;

do $$ begin
  create type public.lead_status as enum ('New', 'Contacted', 'Qualified', 'Closed', 'Lost');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  industry text not null,
  service text not null,
  message text not null,
  status public.lead_status not null default 'New',
  source text not null default 'contact_page',
  ip_address inet,
  device text,
  browser text,
  constraint contact_leads_name_length check (char_length(name) between 2 and 120),
  constraint contact_leads_company_length check (char_length(company) between 2 and 160),
  constraint contact_leads_email_format check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  constraint contact_leads_phone_length check (char_length(phone) between 7 and 20),
  constraint contact_leads_message_length check (char_length(message) between 20 and 4000)
);

alter table public.contact_leads enable row level security;

drop policy if exists "Allow public lead creation" on public.contact_leads;
create policy "Allow public lead creation"
on public.contact_leads
for insert
to anon
with check (
  status = 'New'
  and source in ('contact_page', 'consultation_cta', 'ai_consultant')
  and char_length(name) between 2 and 120
  and char_length(company) between 2 and 160
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'
  and char_length(phone) between 7 and 20
  and char_length(message) between 20 and 4000
);

drop policy if exists "Allow authenticated lead reads" on public.contact_leads;
create policy "Allow authenticated lead reads"
on public.contact_leads
for select
to authenticated
using (true);

drop policy if exists "Allow authenticated lead updates" on public.contact_leads;
create policy "Allow authenticated lead updates"
on public.contact_leads
for update
to authenticated
using (true)
with check (true);

create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);
create index if not exists contact_leads_status_idx on public.contact_leads (status);
create index if not exists contact_leads_service_idx on public.contact_leads (service);
create index if not exists contact_leads_email_idx on public.contact_leads (lower(email));
