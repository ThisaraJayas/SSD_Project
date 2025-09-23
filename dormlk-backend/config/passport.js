// config/passport.js
import "dotenv/config"; // <-- guarantees env is loaded before anything below

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // must be defined
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // must be defined
      callbackURL: process.env.GOOGLE_REDIRECT_URI, // must be defined
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();
        if (!email) return done(new Error("No email from Google"), null);

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            email,
            provider: "GOOGLE",
            google: { id: profile.id },
            avatar: profile.photos?.[0]?.value,
          });
        } else if (!user.google?.id) {
          user.google = { id: profile.id };
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

export default passport;
