// routes/UserRoutes.js
import express from 'express';
import { registerUser, loginUser, getUserProfile, changePassword } from '../controllers/UserController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);
router.put('/change-password', authenticate, changePassword);

export default router;
