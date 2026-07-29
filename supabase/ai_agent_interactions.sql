create extension if not exists pgcrypto;

do $$ begin
  create type public.ai_interaction_type as enum (
    'chat',
    'quick_action',
    'file_upload',
    'proposal',
    'website_audit',
    'meeting_request',
    'voice'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.ai_agent_interactions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id text not null,
  interaction_type public.ai_interaction_type not null default 'chat',
  mode text not null default 'chat',
  user_message text,
  ai_response text,
  lead_name text,
  lead_company text,
  lead_phone text,
  lead_interest text,
  lead_score integer,
  service text,
  metadata jsonb not null default '{}'::jsonb,
  source text not null default 'alpenrose_ai_agent',
  ip_address inet,
  device text,
  browser text,
  constraint ai_agent_session_length check (char_length(session_id) between 8 and 120),
  constraint ai_agent_user_message_length check (user_message is null or char_length(user_message) <= 8000),
  constraint ai_agent_ai_response_length check (ai_response is null or char_length(ai_response) <= 8000),
  constraint ai_agent_lead_score_range check (lead_score is null or lead_score between 0 and 100)
);

alter table public.ai_agent_interactions enable row level security;

drop policy if exists "Allow public AI interaction creation" on public.ai_agent_interactions;
create policy "Allow public AI interaction creation"
on public.ai_agent_interactions
for insert
to anon
with check (
  source = 'alpenrose_ai_agent'
  and char_length(session_id) between 8 and 120
  and (lead_score is null or lead_score between 0 and 100)
  and (user_message is null or char_length(user_message) <= 8000)
  and (ai_response is null or char_length(ai_response) <= 8000)
);

drop policy if exists "Allow authenticated AI interaction reads" on public.ai_agent_interactions;
create policy "Allow authenticated AI interaction reads"
on public.ai_agent_interactions
for select
to authenticated
using (true);

drop policy if exists "Allow authenticated AI interaction updates" on public.ai_agent_interactions;
create policy "Allow authenticated AI interaction updates"
on public.ai_agent_interactions
for update
to authenticated
using (true)
with check (true);

create index if not exists ai_agent_interactions_created_at_idx on public.ai_agent_interactions (created_at desc);
create index if not exists ai_agent_interactions_session_idx on public.ai_agent_interactions (session_id);
create index if not exists ai_agent_interactions_type_idx on public.ai_agent_interactions (interaction_type);
create index if not exists ai_agent_interactions_mode_idx on public.ai_agent_interactions (mode);
create index if not exists ai_agent_interactions_lead_score_idx on public.ai_agent_interactions (lead_score desc);
create index if not exists ai_agent_interactions_metadata_gin_idx on public.ai_agent_interactions using gin (metadata);
