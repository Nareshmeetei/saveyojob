-- Occupation data
CREATE TABLE occupations (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  soc_code               TEXT UNIQUE NOT NULL,
  title                  TEXT NOT NULL,
  slug                   TEXT UNIQUE NOT NULL,
  automation_probability DECIMAL(4,3) CHECK (automation_probability BETWEEN 0 AND 1),
  risk_level             TEXT CHECK (risk_level IN ('Very High','High','Moderate','Low')),
  median_annual_wage     INTEGER,
  employment_count       INTEGER,
  ten_year_growth_pct    DECIMAL(4,1),
  tasks                  JSONB DEFAULT '[]',
  core_skills            JSONB DEFAULT '[]',
  affiliate_courses      JSONB DEFAULT '[]',
  created_at             TIMESTAMPTZ DEFAULT NOW(),
  updated_at             TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_occupations_slug ON occupations(slug);
CREATE INDEX idx_occupations_risk ON occupations(automation_probability DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER occupations_updated_at
  BEFORE UPDATE ON occupations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Saved/shared roadmaps
CREATE TABLE roadmaps (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  share_id        TEXT UNIQUE NOT NULL,
  occupation_slug TEXT,
  job_title       TEXT,
  goal            TEXT,
  time_commitment TEXT,
  roadmap_data    JSONB NOT NULL,
  view_count      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_roadmaps_share_id ON roadmaps(share_id);

-- Email subscribers
CREATE TABLE subscribers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT UNIQUE NOT NULL,
  source          TEXT,
  occupation_slug TEXT,
  roadmap_data    JSONB,
  subscribed_at   TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Affiliate click tracking
CREATE TABLE affiliate_clicks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        TEXT NOT NULL,
  course_name     TEXT,
  occupation_slug TEXT,
  session_id      TEXT,
  clicked_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Rate limiting (simple IP-based)
CREATE TABLE rate_limits (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_hash    TEXT NOT NULL,
  date       DATE NOT NULL DEFAULT CURRENT_DATE,
  count      INTEGER DEFAULT 1,
  UNIQUE(ip_hash, date)
);
CREATE INDEX idx_rate_limits_ip_date ON rate_limits(ip_hash, date);
