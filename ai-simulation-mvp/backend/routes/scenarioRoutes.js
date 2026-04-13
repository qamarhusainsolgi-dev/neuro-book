import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listScenarios, completeScenario, progress, generateDynamicScenario } from '../controllers/scenarioController.js';

const router = Router();
router.use(requireAuth);
router.get('/', listScenarios);
router.post('/complete', completeScenario);
router.get('/progress', progress);
router.post('/generate', generateDynamicScenario);

export default router;
