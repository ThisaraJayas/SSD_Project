import express from "express";
import { googleAuthCallback, googleAuthRedirect } from "../controllers/googleAuthController.js";

const router = express.Router();

router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

export default router;
