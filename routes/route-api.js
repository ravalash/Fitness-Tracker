const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", async (req, res) => {
  const workout = await Workout.findOne({ _id: req.params.id });
  workout.totalDuration += req.body.duration;
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

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
