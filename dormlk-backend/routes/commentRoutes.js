const express = require('express');
const { createComment, getCommentsByPostId } = require('../controllers/CommentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/:postId', getCommentsByPostId);

module.exports = router;
