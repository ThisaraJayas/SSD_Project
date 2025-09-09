const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { updatePostStatus, getAllPosts } = require('../controllers/PostController');
const router = express.Router();

router.put('/:postId/status/:status', authenticate, updatePostStatus);
router.get('/allPosts', getAllPosts);

module.exports = router;