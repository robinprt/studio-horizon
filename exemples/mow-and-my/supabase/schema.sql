create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  status text not null default 'pending',
  date date not null,
  time text not null,
  covers integer not null,
  name text not null,
  phone text not null,
  email text,
  notes text,
  calendar_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reservations_date_time_idx on reservations (date, time);
create index if not exists reservations_status_idx on reservations (status);

create table if not exists reservation_daily_stats (
  date date primary key,
  reservation_count integer not null default 0,
  cover_count integer not null default 0,
  last_archived_at timestamptz not null default now()
);

create table if not exists loyalty_customers (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  name text not null,
  phone text not null,
  phone_key text not null unique,
  email text not null,
  stamps_total integer not null default 0,
  rewards_earned integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists loyalty_visits (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references loyalty_customers(id) on delete cascade,
  stamped_at timestamptz not null default now(),
  note text
);

create index if not exists loyalty_customers_token_idx on loyalty_customers (token);
create index if not exists loyalty_customers_phone_key_idx on loyalty_customers (phone_key);
create index if not exists loyalty_visits_customer_idx on loyalty_visits (customer_id, stamped_at desc);
