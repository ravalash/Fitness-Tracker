//Require mongoose and establish schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define Workout schema
const workoutSchema = new Schema({
  day: {
    type: Date,
    required: "Enter a date for this workout",
    default: Date.now,
  },
  exercises: Array,
  totalDuration: {
    type: Number,
    default: 0,
  },
});

//Export Workout
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
