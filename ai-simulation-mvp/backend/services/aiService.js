import OpenAI from 'openai';
import dotenv from 'dotenv';
import { aiCache } from './cache.js';
import { scenarioPromptTemplate } from '../ai_prompts/scenarioPrompt.js';

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateScenarioFromAI({ domain, skillLevel = 'intermediate', promptSeed }) {
  const cacheKey = `scenario:${domain}:${skillLevel}:${promptSeed}`;
  const cached = aiCache.get(cacheKey);
  if (cached) return { ...cached, source: 'cache' };

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: scenarioPromptTemplate },
      { role: 'user', content: `domain=${domain}; level=${skillLevel}; seed=${promptSeed}` }
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content);
  aiCache.set(cacheKey, parsed);
  return { ...parsed, source: 'openai' };
}
