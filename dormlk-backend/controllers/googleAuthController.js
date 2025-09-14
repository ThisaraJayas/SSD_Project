import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

export const googleAuthRedirect = (req, res) => {
    const state = crypto.randomBytes(16).toString("hex");
    req.session.oauthState = state;
    const url = client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["openid", "email", "profile"],
        state,
    });
    return res.redirect(url);
};

export const googleAuthCallback = async (req, res) => {
    if (req.query.error) {
        // user denied consent or other error
        return res.redirect(`https://dormlk-frontend-1anh.vercel.app/login?error=${encodeURIComponent(req.query.error)}`);
    }
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing authorization code");

    // state validation
    if (!req.query.state || req.query.state !== req.session?.oauthState) {
        return res.status(400).send("Invalid state");
    }
    // clear saved state
    delete req.session.oauthState;

    try {
        const { tokens } = await client.getToken(code);
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload.email;

        // find or create user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                firstName: payload.given_name || "",
                lastName: payload.family_name || "",
                email,
                password: "", // not used
                provider: "GOOGLE",
                google: {
                    id: payload.sub,
                    refreshToken: tokens.refresh_token || undefined,
                    accessToken: tokens.access_token || undefined,
                    tokenExpiry: tokens.expiry_date || undefined
                }
            });
        } else {
            // update google fields if necessary
            user.provider = "GOOGLE";
            if (tokens.refresh_token) user.google = { ...user.google, refreshToken: tokens.refresh_token };
            if (tokens.access_token) user.google = { ...user.google, accessToken: tokens.access_token, tokenExpiry: tokens.expiry_date };
            await user.save();
        }

        // issue your JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // OPTION A: set httpOnly cookie (recommended) and redirect WITHOUT token in URL
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.redirect("https://dormlk-frontend-1anh.vercel.app/oauth-success");

        // OPTION B (if you prefer): redirect with query param (less secure)
        // const redirectUrl = `https://dormlk-frontend-1anh.vercel.app/oauth-success?token=${token}`;
        // return res.redirect(redirectUrl);

    } catch (error) {
        console.error("Google OAuth error:", error);
        return res.redirect("https://dormlk-frontend-1anh.vercel.app/login?error=auth_failed");
    }
};
