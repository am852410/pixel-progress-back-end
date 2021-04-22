require("./app");
const express = require("express");
const app = express();
const cors = require("cors");
app.use("/goals", require("./Controllers/goals.js"));
// app.use("/users", require("./Controllers/users"));

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

app.listen(3000, () => {
  console.log("Server listening");
});
