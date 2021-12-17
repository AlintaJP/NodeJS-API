const googleUser = require('../models/googleUserModel');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
  },
  function (request, accessToken, refreshToken, profile, done) {
    googleUser.findOrCreate(
      {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.email,
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
