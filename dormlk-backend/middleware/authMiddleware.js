import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.header("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.replace("Bearer ", "");
        } else if (req.cookies && req.cookies.authToken) {
            token = req.cookies.authToken;
        }

        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.userId = user._id;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Authentication failed" });
    }
};
