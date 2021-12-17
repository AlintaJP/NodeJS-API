const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const passport = require('passport');

const router = express.Router();

const passportAuth = () => {
  return passport.authenticate('jwt', { session: false });
};

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(passportAuth(), tourController.getAllTours)
  .post(passportAuth(), tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    passportAuth(),
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
