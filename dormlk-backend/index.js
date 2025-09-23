// server.js (or app.js / index.js)
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import passport from "./config/passport.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import messageReplyRoutes from "./routes/messageReplyRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

// Security headers
app.use(helmet());

// Block access to hidden/sensitive files, prevent path traversal, and ensure nosniff header
app.use((req, res, next) => {
  // Normalize path
  let p = "";
  try {
    p = decodeURIComponent(req.path || "").replace(/\\/g, "/");
  } catch (e) {
    return res.status(400).end();
  }

  // Disallow path traversal attempts
  if (p.includes("..")) {
    return res.status(400).end();
  }

  // Deny any segment that starts with a dot or common sensitive names
  const segments = p.split("/").filter(Boolean);
  if (
    segments.some((s) => s.startsWith(".")) ||
    /(^|\/)(\.env|\.git|\.vercel)(\/|$)/i.test(p)
  ) {
    return res.status(404).end();
  }

  // Ensure X-Content-Type-Options header is present
  //   res.setHeader("X-Content-Type-Options", "nosniff");

  next();
});

// Middlewares
app.use(
  cors({
    origin: ["https://dormlk-frontend-1anh.vercel.app", "https://dorm.lk"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
// --- Core middleware ---
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

// CORS (allow credentials)
const allowed = new Set([
  "http://localhost:5173",
  "https://dorm.lk",
  "https://dormlk-frontend-1anh.vercel.app",
]);
app.use(
  cors({
    origin: (origin, cb) => {
      // allow same-origin (no origin) and whitelisted
      if (!origin || allowed.has(origin)) return cb(null, true);
      return cb(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Minimal cookie session ONLY for OAuth transaction state
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 30 * 60 * 1000, // short-lived is fine for the hand-shake
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  })
);

// Passport (no persistent sessions)
app.use(passport.initialize());

// --- Health check ---
app.get("/", (_req, res) => res.send("OK"));

// --- DB ---
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo connection error:", err));

// --- Routes ---
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/replies", messageReplyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", googleAuthRoutes);

// --- Errors ---
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
