import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import scenarioRoutes from './routes/scenarioRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'ai-simulation-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));
