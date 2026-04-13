# AI Simulation Platform MVP (Launch-Ready)

This repo contains a deployable full-stack MVP for an AI simulation SaaS with authentication, scenario gameplay, gamification, leaderboard, freemium gating, and AI-generated dynamic scenarios.

## 1) Folder Structure

```txt
ai-simulation-mvp/
  frontend/
    components/
    pages/
    lib/
    styles/
  backend/
    controllers/
    models/
    routes/
    middleware/
    services/
    ai_prompts/
    database/schema.sql
  shared/
  README.md
```

## 2) Tech Stack
- Frontend: Next.js + React + Tailwind
- Backend: Node.js + Express
- Database: PostgreSQL / Supabase
- AI: OpenAI GPT (gpt-4o-mini by default)
- Caching: NodeCache for repeated scenario generation requests

## 3) Core MVP Features
- Signup, login, password reset stub
- Dashboard for active/completed scenario progression
- AI-powered dynamic scenario generation endpoint
- Gamification: points, levels, badges
- Leaderboard endpoint + UI
- Freemium logic: premium scenarios gated by `users.premium`
- Persistent decisions/scores in PostgreSQL

## 4) API Routes
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/password-reset`
- `GET /api/auth/me`
- `GET /api/scenarios`
- `POST /api/scenarios/complete`
- `GET /api/scenarios/progress`
- `POST /api/scenarios/generate`
- `GET /api/leaderboard`

## 5) Local Setup

### Backend
```bash
cd ai-simulation-mvp/backend
cp .env.example .env
npm install
# create DB and run schema file in your postgres/supabase SQL editor
npm run dev
```

### Frontend
```bash
cd ai-simulation-mvp/frontend
npm install
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api" > .env.local
npm run dev
```

Open `http://localhost:3000`.

## 6) Deployment Guide

### Database (Supabase / Cloud Postgres)
1. Create Postgres DB.
2. Run `backend/database/schema.sql`.
3. Copy connection string into `DATABASE_URL`.

### Backend (Render / Railway / Fly)
1. Create new web service pointed to `ai-simulation-mvp/backend`.
2. Set env vars: `DATABASE_URL`, `JWT_SECRET`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `NODE_ENV=production`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Verify `/health` endpoint.

### Frontend (Vercel / Netlify)
1. Import `ai-simulation-mvp/frontend` as project root.
2. Set env var `NEXT_PUBLIC_API_BASE_URL` to deployed backend URL + `/api`.
3. Build command: `npm run build`; output handled by Next runtime.
4. Deploy and smoke test `/auth`, `/dashboard`, `/leaderboard`.

## 7) Freemium & Premium Logic
- Scenario rows use `is_premium` boolean.
- `/api/scenarios` returns free + premium only if `req.user.premium === true`.
- `/api/scenarios/complete` blocks completion for premium content if user is not premium.

## 8) Gamification Logic
- Points earned from selected options.
- Level = `floor(total_points / 100) + 1`.
- Badges:
  - `Rising Leader` at 100+
  - `Scenario Analyst` at 250+
  - `Grand Strategist` at 500+

## 9) Launch Content Included
- 5 free scenarios
- 2 premium scenarios
- Sample admin user in `schema.sql`

## 10) AI Prompting + JSON Contract
System prompt in `backend/ai_prompts/scenarioPrompt.js` enforces strict JSON response format:

```json
{
  "title": "...",
  "scenario_text": "...",
  "options": [
    {"text": "...", "consequence": "...", "points": 60}
  ],
  "difficulty": "...",
  "domain": "..."
}
```

## 11) Security Notes
- JWT auth middleware secures scenario endpoints.
- Passwords hashed with bcrypt.
- Use long random `JWT_SECRET` in production.
- Add rate limiting and email provider for password reset in v1.1.
