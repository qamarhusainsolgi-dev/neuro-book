import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from '../models/userModel.js';

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email, premium: user.premium }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

export async function signup(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const existing = await findUserByEmail(email);
  if (existing) return res.status(409).json({ error: 'Email already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser(email, hash);
  return res.status(201).json({ token: signToken(user), user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  return res.json({ token: signToken(user), user: { id: user.id, email: user.email, premium: user.premium } });
}

export async function me(req, res) {
  const user = await findUserById(req.user.id);
  res.json(user);
}

export async function requestPasswordReset(req, res) {
  const { email } = req.body;
  return res.json({ message: `Password reset link sent to ${email} (stub in MVP)` });
}
