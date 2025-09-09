const express = require('express');
const { createPost, getAllPosts, getPostByDistrict,
    getPostById,
    getPostByAccommodationType,
    getPostBySearchHome,
    getPostsByUserId,
    deletePostById } = require('../controllers/PostController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createPost);
router.get('/', getAllPosts);


// Search Post by District and/or Accommodation Type
router.get('/search', getPostBySearchHome);
// Get Post by District
router.get('/district/:districts', getPostByDistrict);

// Get Post by ID
router.get('/:postId', getPostById);


// Get Post by Accommodation Type
router.get('/accommodationType/:accommodationType', getPostByAccommodationType);

// Get Posts by User ID
router.get('/posts/:userId', getPostsByUserId);

// Delete Post by ID
router.delete('/:postId', authenticate, deletePostById);

module.exports = router;
