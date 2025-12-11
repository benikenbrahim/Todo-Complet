// config/passport.js  (ou où vous avez la config Google)
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User           = require('../DataLayer/users'); 
const dotenv        = require('dotenv').config();


passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  process.env.GOOGLE_CALLBACK_URL, // même URL que dans Google Console
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, displayName, emails } = profile;

        let user = await User.findOne({ provider: 'google', providerId: id });

        if (!user) {
          // Création première connexion
          user = await User.create({
            provider:   'google',
            providerId: id,
            email:      emails?.[0]?.value,
            username:   displayName
            // password non fourni → validation OK grâce au required conditionnel
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;