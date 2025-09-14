// routes/PostRoutes.js
import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostByDistrict,
    getPostById,
    getPostByAccommodationType,
    getPostBySearchHome,
    getPostsByUserId,
    deletePostById
} from '../controllers/PostController.js';
import { authenticate } from '../middleware/authMiddleware.js';

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

export default router;
