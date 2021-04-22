require("./app");
const express = require("express");
const app = express();
const cors = require("cors");
app.use("/goals", require("./Controllers/goals.js"));
app.use("/users", require("./Controllers/users.js"));

app.use(express.json());

// Setup Cors middleware
const whitelist = ["http://localhost:3000"];
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

app.use(cors(corsOptions));

// this line is creating the object "req.session"
app.use(
  session({
    secret: "JustKiding",
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.status(403).json({ msg: "loging require" });
  }
};

// controllers
app.use(
  "/holidays",
  isAuthenticated,
  require("./controllers/holidaysController")
);
app.use("/users", require("./controllers/usersController"));

app.listen(3000, () => {
  console.log("Server listening");
});
