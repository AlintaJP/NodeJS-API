const express = require('express');
const passport = require('passport');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(
  passport.authenticate('google', {
    session: false,
    scope: ['email', 'profile'],
  })
);

router.route('/callback').get(
  passport.authenticate('google', {
    session: false,
  }),
  authController.issueJWTGoogle
);

module.exports = router;
