const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || process.env.DB_HOST, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/route-api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
