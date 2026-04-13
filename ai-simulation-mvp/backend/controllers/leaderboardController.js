import { getLeaderboard } from '../models/scenarioModel.js';

export async function leaderboard(req, res) {
  const rows = await getLeaderboard(10);
  res.json(rows);
}
