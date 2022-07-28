const express = require('express');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

// get all workouts
router.get('/:type', workoutController.getWorkouts);

// get single workout
router.get('/:id', workoutController.getWorkout)

// create new workout
router.post('/', workoutController.createWorkout)


// delete workout
router.delete('/:id', workoutController.deleteWorkout)

// update workout
router.patch('/:id', workoutController.updateWorkout)

module.exports = router;