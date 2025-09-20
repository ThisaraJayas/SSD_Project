// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieSession from "cookie-session";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";

// import userRoutes from "./routes/userRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import messageReplyRoutes from "./routes/messageReplyRoutes.js";
// import commentRoutes from "./routes/commentRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import googleAuthRoutes from "./routes/googleAuthRoutes.js";

// dotenv.config();

// const app = express();
// const port = 3000;

// // Middlewares
// app.use(
//   cors({
//     origin: ["https://dormlk-frontend-1anh.vercel.app", "https://dorm.lk"],
//     methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     credentials: true,
//   })
// );
// app.use(express.json());

// app.set("trust proxy", 1); // if behind a proxy (Heroku / Vercel)
// app.use(cookieParser());
// app.use(
//   cookieSession({
//     name: "session",
//     keys: [process.env.SESSION_SECRET || "dev-secret"],
//     maxAge: 24 * 60 * 60 * 1000,
//   })
// );

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.NONGO_URL)
//   .then(() => {
//     console.log("Database Connected Successfully..");
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Error:", err);
//   });

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/replies", messageReplyRoutes);
// app.use("/api/comments", commentRoutes);
// app.use("/api/admin", adminRoutes);

// // Google OAuth Routes
// app.use("/api/auth", googleAuthRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// ...existing code...
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import messageReplyRoutes from "./routes/messageReplyRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";

dotenv.config();

const app = express();
const port = 3000;

// Security headers
app.use(helmet());

// CORS whitelist and safe dynamic origin handling
const CORS_WHITELIST = [
  "https://dormlk-frontend-1anh.vercel.app",
  "https://dorm.lk",
];

// Ensure caches/proxies vary responses by origin
app.use((req, res, next) => {
  res.setHeader("Vary", "Origin");
  next();
});

// Dynamic, restrictive CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests without an Origin header (curl, mobile apps, same-origin)
      if (!origin) return callback(null, true);
      if (CORS_WHITELIST.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: origin not allowed"), false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// // Block access to dotfiles / sensitive filenames and path traversal, ensure nosniff header
// app.use((req, res, next) => {
//   let p = "";
//   try {
//     p = decodeURIComponent(req.path || "").replace(/\\/g, "/");
//   } catch (e) {
//     return res.status(400).end();
//   }

// +  // Deny path traversal attempts
// +  if (p.includes("..")) return res.status(400).end();
// +
// +  // Deny access to hidden files (any segment starting with '.') or common sensitive names
// +  const segments = p.split("/").filter(Boolean);
// +  if (segments.some(s => s.startsWith(".")) || /(^|\/)(\.env|\.git|\.vercel)(\/|$)/i.test(p)) {
// +    return res.status(404).end();
// +  }
// +
// +  // Fallback: ensure header present
// +  res.setHeader("X-Content-Type-Options", "nosniff");
// +  next();
// +});
// +
// Middlewares
app.use(
  cors({
    origin: ["https://dormlk-frontend-1anh.vercel.app", "https://dorm.lk"],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.set("trust proxy", 1); // if behind a proxy (Heroku / Vercel)
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev-secret"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
const isProd = process.env.NODE_ENV === "production";
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev-secret"],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: isProd, // require HTTPS in production
    sameSite: "none", // required for cross-site requests with credentials
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.NONGO_URL)
  .then(() => {
    console.log("Database Connected Successfully..");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/replies", messageReplyRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

// Google OAuth Routes
app.use("/api/auth", googleAuthRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
