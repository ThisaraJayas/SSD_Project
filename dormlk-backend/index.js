// server.js
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import csurf from "csurf";

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

// --- Security headers ---
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // tweak if you serve images/files
  }),
);

// Core middleware
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
      if (!origin || allowed.has(origin)) return cb(null, true);
      return cb(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

// Minimal cookie session ONLY for OAuth "state"
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 30 * 60 * 1000,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  }),
);

// Passport (no persistent sessions)
app.use(passport.initialize());

// --- CSRF protection (cookie-based) ---
// Put CSRF **after** cookieParser/cookieSession and **before** your API routes.
const csrfProtection = csurf({
  cookie: {
    // Secret cookie that csurf uses to validate the token
    key: "_csrf", // cookie name for the secret
    httpOnly: true, // not readable by JS
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  },
});

// Provide a readable token cookie for the SPA.
// Axios (withCredentials) will echo this token back in a header automatically if configured.
app.use((req, res, next) => {
  // csurf attaches req.csrfToken() only AFTER its own middleware runs,
  // so we set this cookie in a tiny per-request hook we'll place AFTER csurf (see below).
  next();
});

// --- Health check (public, no CSRF needed) ---
app.get("/", (_req, res) => res.send("OK"));

// --- DB ---
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error("Mongo connection error:", err));

// Mount routes **under /api** and protect them with CSRF (safe methods are ignored by csurf).
app.use("/api", csrfProtection, (req, res, next) => {
  // After csrfProtection, we can issue a non-HttpOnly token cookie for the SPA:
  // Name it 'XSRF-TOKEN' so axios can pick it up automatically.
  try {
    const token = req.csrfToken(); // may throw if no secret cookie present yet
    res.cookie("XSRF-TOKEN", token, {
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      httpOnly: false, // readable by JS/axios
      path: "/", // send to all API routes
    });
  } catch (_) {
    // ignore; token will be generated on next request
  }
  next();
});

// Your actual API routes (now under /api with CSRF active)
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/replies", messageReplyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", googleAuthRoutes); // GET endpoints (OAuth) are allowed; csurf ignores GET/HEAD/OPTIONS by default

// Optional endpoint to fetch the token explicitly (useful for debugging)
app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// --- Errors ---
// Special handler for CSRF errors so the frontend can handle it nicely
app.use((err, _req, res, _next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ message: "Invalid CSRF token" });
  }
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
