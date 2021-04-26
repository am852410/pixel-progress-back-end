const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();

// USER CREATE ROUTE
users.post("/signup", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(req.body, (err, createdUser) => {
    if (err) return res.status(500).send(err);
    res.send(createdUser);
  });
});



users.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(500).send(err);
    res.send(foundUser);
  });
});

users.get("", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

users.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) return res.status(500).send(err);
      return res.send(updatedUser);
    }
  );
});

users.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "User successfully deleted",
      id: user._id
    };

    return res.status(200).send(response);
  });
});

module.exports = users;
