const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config();

const Goal = require("./Models/goalModel.js");
const User = require("./Models/userModel.js");

const goalSeed = require("./Seeds/goalSeed.js");
const userSeed = require("./Seeds/userSeed.js");

// Connect to Mongo
mongoose.connect(
  process.env.MONGODBURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("The connection with mongod is established");
  }
);

// err / success
db.on("err", err => console.log(err.message + " is Mongod not running?"));
db.on("connected", () =>
  console.log("mongo connected: ", process.env.MONGODBURI)
);
db.on("disconnected", () => console.log("mongo disconnected"));

// Goal.create(goalSeed, (err, data) => {
//   if (err) console.log(err.message);
//   console.log("added provided goal data");
// });
Goal.countDocuments({}, (err, data) => {
  if (err) console.log(err.message);
  console.log(`There are ${data} goals in this database`);
});

// User.create(userSeed, (err, data) => {
//   if (err) console.log(err.message);
//   console.log("added provided user data");
// });

User.countDocuments({}, (err, data) => {
  if (err) console.log(err.message);
  console.log(`There are ${data} users in this database`);
});
