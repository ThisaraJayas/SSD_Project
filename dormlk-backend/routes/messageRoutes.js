// routes/MessageRoutes.js
import express from 'express';
import { createMessage, getMessagesByUserId, getReceivedMessages } from '../controllers/MessageController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createMessage);
router.get('/user/:userId', authenticate, getMessagesByUserId);
router.get('/received', authenticate, getReceivedMessages);

export default router;
