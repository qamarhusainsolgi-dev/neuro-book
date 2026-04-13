-- AI Simulation Platform PostgreSQL Schema
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  options JSONB NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  points INT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_scores_user_id ON scores(user_id);
CREATE INDEX IF NOT EXISTS idx_scores_scenario_id ON scores(scenario_id);

-- Sample admin account (password: Admin123!)
INSERT INTO users (email, password_hash, premium)
VALUES (
  'admin@simuverse.ai',
  '$2a$10$EjhO4SKoQ9kA6P6d20gIeOGccGf8Fj1L4WAgQ8kNn4g6NfITQ6j6G',
  TRUE
)
ON CONFLICT (email) DO NOTHING;

-- 5 Free scenarios
INSERT INTO scenarios (title, content, options, is_premium) VALUES
(
  'Supply Chain Crisis Response',
  'A key supplier shuts down unexpectedly. Your production line will stop in 10 days. Decide your first move.',
  '[{"text":"Split orders across 3 smaller vendors","consequence":"Higher short-term cost but resilience improves","points":70},{"text":"Wait 5 days for original supplier update","consequence":"Could save costs, but risk total disruption","points":25},{"text":"Air-freight emergency inventory","consequence":"Service continuity with steep margin hit","points":55},{"text":"Pause low-margin product lines","consequence":"Protects cash and core products","points":65}]'::jsonb,
  FALSE
),
(
  'New Market Entry',
  'Your company is considering expansion into Southeast Asia. Budget allows only one launch strategy.',
  '[{"text":"Partner with local distributor","consequence":"Faster entry with lower control","points":60},{"text":"Open wholly-owned office","consequence":"High control but costly and slow","points":45},{"text":"Launch digital-only pilot","consequence":"Low risk, slower brand trust","points":70},{"text":"Acquire a small local competitor","consequence":"Quick market share, integration risk","points":55}]'::jsonb,
  FALSE
),
(
  'Leadership Conflict',
  'Two high-performing directors are in conflict, impacting team morale and delivery.',
  '[{"text":"Facilitated mediation + aligned KPIs","consequence":"Builds trust and shared outcomes","points":75},{"text":"Reassign one director","consequence":"Quick fix with culture risk","points":40},{"text":"Ignore and focus on output metrics","consequence":"Short-term performance, long-term attrition","points":20},{"text":"Escalate to HR investigation","consequence":"Formal process, potentially slow","points":50}]'::jsonb,
  FALSE
),
(
  'Cyber Incident Disclosure',
  'A minor breach affected 2% of users. Legal says disclosure is optional in your region.',
  '[{"text":"Disclose immediately and outline remediation","consequence":"Trust increases, short-term PR hit","points":80},{"text":"Delay disclosure pending forensic certainty","consequence":"More complete facts, trust risk","points":45},{"text":"Disclose only to impacted users","consequence":"Targeted transparency, broader risk remains","points":60},{"text":"No disclosure","consequence":"Regulatory and reputational risk if leaked","points":10}]'::jsonb,
  FALSE
),
(
  'Product Roadmap Tradeoff',
  'You can deliver either enterprise features or onboarding improvements this quarter, not both.',
  '[{"text":"Choose onboarding improvements","consequence":"Reduces churn and CAC payback","points":70},{"text":"Choose enterprise features","consequence":"Larger deals, longer sales cycle","points":65},{"text":"Attempt both with overtime","consequence":"Team burnout and lower quality","points":20},{"text":"Delay decision for more research","consequence":"Lower risk, opportunity cost","points":45}]'::jsonb,
  FALSE
),

-- 2 Premium scenarios
(
  'Geopolitical Sanctions Shock',
  'Overnight sanctions block your top export market. Board demands a 90-day recovery plan.',
  '[{"text":"Pivot to adjacent compliant markets","consequence":"Revenue dip, strategic resilience","points":90},{"text":"Lobby for exemptions","consequence":"Potential upside with uncertain timeline","points":60},{"text":"Cut 25% workforce immediately","consequence":"Cash preservation with capability loss","points":40},{"text":"Pause operations temporarily","consequence":"Limits losses, damages market confidence","points":35}]'::jsonb,
  TRUE
),
(
  'AI Regulation and Ethics Crisis',
  'A regulator questions your model fairness in public. Enterprise clients request immediate assurance.',
  '[{"text":"Publish third-party audit + action plan","consequence":"Strong credibility, near-term cost","points":95},{"text":"Release internal whitepaper only","consequence":"Moderate reassurance","points":60},{"text":"Challenge regulator publicly","consequence":"Polarizes stakeholders","points":25},{"text":"Silently patch and move on","consequence":"Short-term relief, trust erosion risk","points":30}]'::jsonb,
  TRUE
)
ON CONFLICT DO NOTHING;
