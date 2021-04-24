const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();

users.post("", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(req.body, (err, createdUser) => {
    if (err) return res.status(500).send(err);
    res.send(createdUser);
  });
});

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
users.post("/login", (req, res) => {
  console.log("username", req.body.username);
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.send(err);
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          //login user and create session
          req.session.currentUser = foundUser;
          res.status(200).json(foundUser);
        } else {
          res.status(404).json({ err: "User Not Found" });
        }
      } else {
        res.status(400).json({ err: err.message });
      }
    }
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
