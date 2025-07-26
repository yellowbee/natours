//const fs = require('fs');
const mongoose = require('mongoose');
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'));
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (error) {
    res.status(404).json({
      message: 'No tours found.',
    });
  }
  /*console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    data: {
      tours: tours,
    }
  });*/
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: 'No tours found.',
    })
  }
  /*console.log(req.params.id);
  const id = req.params.id * 1;
  const tour = tours.find(tour => tour.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    }
  });*/
};

exports.createTour = async (req, res) => {
  /*const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId}, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });*/
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'There was an error creating the Tour'
    })
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: error.message
    });
  }
}

/*exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'error',
      message: 'No tours found.'
    })
  }
  next();
};*/

/*exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'Bad Request: name and/or price are required'
    })
    next();
  }
}*/