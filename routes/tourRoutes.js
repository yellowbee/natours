const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// middleware to validate the params
//router.param('id', tourController.checkID)


router
  .route('/')
  .get(tourController.getAllTours)
  //.post(tourController.checkBody, tourController.createTour);
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour);

module.exports = router;