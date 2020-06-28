//Require express router, Workout model, and path
const router = require("express").Router();
const path = require("path");
const Workout = require(path.join(__dirname, "../models/workout.js"));

//Serve exercise.html to /exercise route
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//Serve stats.html to /stats route
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

//Create new workout and return result
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Update existing workout by ID 
router.put("/api/workouts/:id", async (req, res) => {
  //Find workout by ID and calculate total duration by adding duration of incoming exercise.
  const workout = await Workout.findOne({ _id: req.params.id });
  workout.totalDuration += req.body.duration;
  //Update record by pushing exercise to array and setting total duration to new value.
  Workout.updateOne(
    { _id: req.params.id },
    {
      $push: { exercises: req.body },
      $set: { totalDuration: workout.totalDuration },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Get all workouts sorted by day to return most recent
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: 1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Get all workouts sorted by day descending.
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
