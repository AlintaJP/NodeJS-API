const GoogleUser = require('../models/googleModel');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://127.0.0.1:3000/auth/google/callback`,
    passReqToCallback: true,
  },
  function (request, accessToken, refreshToken, profile, done) {
    GoogleUser.findOrCreate(
      {
        googleId: profile.id,
      },
      {
        name: profile.displayName,
        email: profile.email,
        photo: profile.picture,
      },
      function (err, user) {
        return done(err, user);
      }
    );
  }
);

module.exports = (passport) => {
  passport.use(strategy);
};
