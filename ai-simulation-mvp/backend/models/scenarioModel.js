import { query } from '../services/db.js';

export async function getScenariosForUser(isPremium) {
  const sql = `SELECT id,title,content,options,is_premium FROM scenarios WHERE is_premium = false OR $1 = true ORDER BY id`;
  const { rows } = await query(sql, [isPremium]);
  return rows;
}

export async function getScenarioById(id) {
  const { rows } = await query('SELECT * FROM scenarios WHERE id = $1', [id]);
  return rows[0];
}

export async function saveScore(userId, scenarioId, points) {
  const { rows } = await query(
    'INSERT INTO scores (user_id, scenario_id, points) VALUES ($1,$2,$3) RETURNING *',
    [userId, scenarioId, points]
  );
  return rows[0];
}

export async function getUserProgress(userId) {
  const sql = `
    SELECT COUNT(*)::int as completed_count, COALESCE(SUM(points),0)::int as total_points
    FROM scores WHERE user_id = $1
  `;
  const { rows } = await query(sql, [userId]);
  return rows[0];
}

export async function getLeaderboard(limit = 10) {
  const sql = `
    SELECT u.id, u.email, COALESCE(SUM(s.points),0)::int AS total_points
    FROM users u
    LEFT JOIN scores s ON s.user_id = u.id
    GROUP BY u.id
    ORDER BY total_points DESC
    LIMIT $1
  `;
  const { rows } = await query(sql, [limit]);
  return rows;
}
