import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";

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
app.use(cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev-secret"],
    maxAge: 24 * 60 * 60 * 1000,
}));

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
