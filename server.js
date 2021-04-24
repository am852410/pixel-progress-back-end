require("./app");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const jsonParser = bodyParser.json();
const cors = require("cors");
const session = require("express-session");

app.use(express.json());

// Setup Cors middleware
const whitelist = [process.env.BASEURL];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.status(403).json({ msg: "log in required" });
  }
};

app.use(cors(corsOptions));

// this line is creating the object "req.session"
app.use(
  session({
    secret: process.env.SECRET,
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);
app.use(express.json());
// controllers
app.use("/goals", isAuthenticated, require("./Controllers/goals"));
app.use("/users", require("./Controllers/users"));
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log("Server listening");
});
