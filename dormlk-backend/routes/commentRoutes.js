// routes/CommentRoutes.js
import express from 'express';
import { createComment, getCommentsByPostId } from '../controllers/CommentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/:postId', getCommentsByPostId);

export default router;
