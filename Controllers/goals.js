const Goal = require("../Models/goalModel.js");
const express = require("express");
const goals = express.Router();

goals.post("/goals", (req, res) => {
  Goal.create(req.body, (error, createdGoal) => {
    if (err) return res.status(500).send(err);
    res.send(createdGoal);
  });
});

goals.get("/goals/:id", (req, res) => {
  Goal.findById(req.params.id, (err, foundGoal) => {
    if (err) return res.status(500).send(err);
    res.send(foundGoal);

    console.log(parseJSON(foundGoal));
  });
});

goals.get("/goals", async (req, res) => {
  const goals = await Goal.find({});
  if (err) return res.status(500).send(err);
  res.send(goals);
});

goals.put("/goals/:id", (req, res) => {
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

goals.delete("/goals/:id", (req, res) => {
  Goal.findByIdAndRemove(req.params.id, (err, goal) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Goal successfully deleted",
      id: goal._id
    };

    return res.status(200).send(response);
  });
});

module.exports = goals;
