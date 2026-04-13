import { generateScenarioFromAI } from '../services/aiService.js';
import { getScenariosForUser, getScenarioById, saveScore, getUserProgress } from '../models/scenarioModel.js';

export async function listScenarios(req, res) {
  const scenarios = await getScenariosForUser(req.user.premium);
  res.json(scenarios);
}

export async function completeScenario(req, res) {
  const { scenarioId, points } = req.body;
  const scenario = await getScenarioById(scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  if (scenario.is_premium && !req.user.premium) return res.status(403).json({ error: 'Premium required' });

  const score = await saveScore(req.user.id, scenarioId, points);
  const progress = await getUserProgress(req.user.id);

  let badge = null;
  if (progress.total_points >= 500) badge = 'Grand Strategist';
  else if (progress.total_points >= 250) badge = 'Scenario Analyst';
  else if (progress.total_points >= 100) badge = 'Rising Leader';

  res.json({ score, progress, badge });
}

export async function generateDynamicScenario(req, res) {
  const { domain, skillLevel, promptSeed } = req.body;
  const scenario = await generateScenarioFromAI({ domain, skillLevel, promptSeed });
  res.json(scenario);
}

export async function progress(req, res) {
  const result = await getUserProgress(req.user.id);
  const level = Math.floor(result.total_points / 100) + 1;
  res.json({ ...result, level });
}
