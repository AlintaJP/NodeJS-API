const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

const passportAuth = () => {
  return passport.authenticate('jwt', { session: false });
};

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  passportAuth(),
  authController.updatePassword
);

router.patch('/updateMe', passportAuth(), userController.updateMe);
router.delete('/deleteMe', passportAuth(), userController.deleteMe);

module.exports = router;
