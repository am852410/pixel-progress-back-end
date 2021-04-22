require("./app");
const express = require("express");
const Goal = require("./Models/goalModel.js");
const cors = require("cors");
const app = express();
const PORT = 3003

app.use(express.json());

// Setup Cors middleware
const whitelist = [`http://localhost:3000`];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
  // credentials: true
};

app.use(cors(corsOptions));

app.post("/goals", (req, res) => {
  Goal.create(req.body, (error, createdGoal) => {
    if (error) return res.status(500).send(error);
    res.send(createdGoal);
  });
});

app.get("/goals/:id", (req, res) => {
  Goal.findById(req.params.id, (err, foundGoal) => {
    if (err) return res.status(500).send(err);
    res.send(foundGoal);

    console.log(parseJSON(foundGoal));
  });
});

app.get("/goals", async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.send(goals);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/goals/:id", (req, res) => {
  Goal.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedGoal) => {
      if (err) return res.status(500).send(err);
      return res.send(updatedGoal);
    }
  );
});

app.delete("/goals/:id", (req, res) => {
  Goal.findByIdAndRemove(req.params.id, (err, goal) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Goal successfully deleted",
      id: goal._id
    };

    return res.status(200).send(response);
  });
});

app.listen(PORT, () => {
  console.log("Server listening");
});
