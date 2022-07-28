require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRouter = require('./routes/workouts');

const app = express();

// parse incoming requests
app.use(express.json());

app.get('/', (req, res) => {
  res.json('hello')
})

app.use('/api/workouts', workoutRouter)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB.');
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}...`)
    });
  })
  .catch((error) => {
    console.log(error);
  })