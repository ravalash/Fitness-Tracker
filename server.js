//Require express, mongoose, dotenv for development
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

//Set port for development and production
const PORT = process.env.PORT || 3000;

//Setup expresss
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Set mongoose connection for both development and production
mongoose.connect(process.env.MONGODB_URI || process.env.DB_HOST, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Require routes
app.use(require(path.join(__dirname, "./routes/route-api.js")));


//Start server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
