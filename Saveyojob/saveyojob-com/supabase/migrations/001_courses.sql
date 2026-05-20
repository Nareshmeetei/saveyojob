-- Courses table
create table if not exists courses (
  id            uuid primary key default gen_random_uuid(),
  title         text        not null,
  category      text        not null,
  impact_score  int         not null check (impact_score between 1 and 100),
  platform      text        not null,
  url           text,
  duration      text,
  created_at    timestamptz not null default now()
);

-- Enable RLS — public read, no public write
alter table courses enable row level security;
create policy "Public can read courses" on courses
  for select using (true);

-- Seed data
insert into courses (title, category, impact_score, platform, url, duration) values
  ('IBM AI Foundations for Business',         'AI Literacy',   92, 'Coursera',         'https://coursera.org',  '4 weeks'),
  ('Google Data Analytics Certificate',       'Data Analysis', 88, 'Coursera',         'https://coursera.org',  '6 months'),
  ('ChatGPT Prompt Engineering for Devs',     'AI Tools',      85, 'DeepLearning.AI',  'https://deeplearning.ai','2 weeks'),
  ('Python for Everybody Specialization',     'Programming',   82, 'Coursera',         'https://coursera.org',  '8 months'),
  ('Microsoft Power BI Data Analyst',         'Data Analysis', 78, 'LinkedIn Learning','https://linkedin.com',  '5 months'),
  ('AI for Everyone by Andrew Ng',            'AI Literacy',   76, 'Coursera',         'https://coursera.org',  '3 weeks'),
  ('UX Design Professional Certificate',      'Design',        65, 'Google / Coursera','https://coursera.org',  '6 months'),
  ('Strategic Communication & Leadership',    'Soft Skills',   55, 'LinkedIn Learning','https://linkedin.com',  '4 weeks'),
  ('Machine Learning Specialization',         'AI / ML',       94, 'Coursera',         'https://coursera.org',  '3 months');
