import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { updatePostStatus, getAllPosts } from "../controllers/PostController.js";

const router = express.Router();

router.put("/:postId/status/:status", authenticate, updatePostStatus);
router.get("/allPosts", getAllPosts);

export default router;
