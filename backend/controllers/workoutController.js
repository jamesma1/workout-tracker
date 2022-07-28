const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const workoutController = {};

// get all workouts / get workout by type
workoutController.getWorkouts = async (req, res) => {
  const { type } = req.params;
  if (type === "All") {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } else {
    const workouts = await Workout.find({ type: type }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  }

}

// get a single workout
workoutController.getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout does not exist."})
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "Workout does not exist."})
  }

  res.status(200).json(workout);
}

// create new workout
workoutController.createWorkout = async (req, res) => {
  const { title, reps, load, type } = req.body;
  const missingFields = [];

  if (!title) {
    missingFields.push('title');
  }
  if (!reps) {
    missingFields.push('reps');
  }
  if (!load) {
    missingFields.push('load');
  }
  if (!type) {
    missingFields.push('type');
  }
  if (missingFields.length) {
    return res.status(400).json({error: 'Please fill in all fields.', missingFields});
  }
  try {
    const workout = await Workout.create({title, reps, load, type});
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// delete workout
workoutController.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout does not exist."})
  }
  const workout = await Workout.findOneAndDelete({_id: id});
  if (!workout) {
    return res.status(400).json({ error: "Workout does not exist."})
  }
  res.status(200).json(workout);
}


// update workout
workoutController.updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Workout does not exist."})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  }, {new: true})

  if (!workout) {
    return res.status(400).json({ error: "Workout does not exist."})
  }
  res.status(200).json(workout);
}

module.exports = workoutController;