const Goal = require("../Models/goalModel.js");
const express = require("express");
const goals = express.Router();

goals.post("", (req, res) => {
  req.body.user_id = req.session.currentUser._id;
  Goal.create(req.body, (err, createdGoal) => {
    if (err) return res.status(500).send(err);
    res.send(createdGoal);
  });
});

goals.get("/:id", (req, res) => {
  Goal.findById(req.params.id, (err, foundGoal) => {
    if (err) return res.status(500).send(err);
    res.send(foundGoal);
  });
});

goals.get("", async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.send(goals);
  } catch (err) {
    return res.status(500).send(err);
  }
});

goals.put("/:id", (req, res) => {
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

goals.delete("/:id", (req, res) => {
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
