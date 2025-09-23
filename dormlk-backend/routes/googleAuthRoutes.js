// routes/googleAuthRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";

const cookieOpts = {
  httpOnly: true,
  secure: isProd, // requires HTTPS in prod
  sameSite: isProd ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day; match your JWT expires
  path: "/",
};

function signJwt(user) {
  return jwt.sign(
    { userId: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" },
  );
}

// Step 1: Kick off Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    state: true,
  }),
);

// Step 2: Google callback -> set cookie -> redirect
router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/auth-failed`,
    },
    (err, user) => {
      if (err) return next(err);
      if (!user) return res.redirect(`${process.env.CLIENT_URL}/auth-failed`);

      const token = signJwt(user);
      res.cookie("authToken", token, cookieOpts);

      // clear the temporary OAuth session cookie used for state
      res.clearCookie("session"); // cookie-session default name (we'll set it below too)
      return res.redirect(`${process.env.CLIENT_URL}/auth-success`);
    },
  )(req, res, next);
});

// Optional: logout route
router.post("/logout", (req, res) => {
  res.clearCookie("authToken", { path: "/" });
  res.clearCookie("session");
  res.status(204).end();
});

export default router;
