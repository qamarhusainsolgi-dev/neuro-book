import { Router } from 'express';
import { signup, login, me, requestPasswordReset } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/password-reset', requestPasswordReset);
router.get('/me', requireAuth, me);

export default router;
