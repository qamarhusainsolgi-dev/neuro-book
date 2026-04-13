import { query } from '../services/db.js';

export async function createUser(email, passwordHash) {
  const sql = `INSERT INTO users (email, password_hash) VALUES ($1,$2) RETURNING id,email,premium,created_at`;
  const { rows } = await query(sql, [email, passwordHash]);
  return rows[0];
}

export async function findUserByEmail(email) {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

export async function findUserById(id) {
  const { rows } = await query('SELECT id, email, premium, created_at FROM users WHERE id = $1', [id]);
  return rows[0];
}
