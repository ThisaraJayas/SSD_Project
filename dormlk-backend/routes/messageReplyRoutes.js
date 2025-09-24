// routes/MessageReplyRoutes.js
import express from 'express';
import { createReply, getRepliesByMessageId } from '../controllers/MessageReplyController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createReply);
router.get('/:messageId', authenticate, getRepliesByMessageId);

export default router;
