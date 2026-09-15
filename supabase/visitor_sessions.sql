create table if not exists public.visitor_sessions (
  session_key text primary key,
  visitor_key text not null,
  day_key text not null,
  month_key text not null,
  tracked_at timestamptz not null default now(),
  page_path text,
  device_kind text,
  device_vendor text,
  device_model text,
  os_name text,
  os_version text,
  browser_name text,
  browser_version text,
  user_agent text,
  language text,
  viewport text,
  memory_gb numeric,
  cpu_cores integer,
  touch_points integer,
  connection_type text,
  ip_address text,
  city text,
  region text,
  country text,
  isp text,
  asn text,
  network_flags jsonb not null default '[]'::jsonb,
  network_label text,
  location_label text
);

create index if not exists visitor_sessions_visitor_day_idx
  on public.visitor_sessions (visitor_key, day_key);

create index if not exists visitor_sessions_visitor_month_idx
  on public.visitor_sessions (visitor_key, month_key);

alter table public.visitor_sessions enable row level security;

create policy "visitor sessions can be read"
  on public.visitor_sessions for select
  using (true);

create policy "visitor sessions can be written"
  on public.visitor_sessions for insert
  with check (true);

create policy "visitor sessions can be updated"
  on public.visitor_sessions for update
  using (true)
  with check (true);
