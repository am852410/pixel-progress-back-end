const User = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();

//--------------------------------------------
// USER CREATE ROUTE
//--------------------------------------------
users.post("/signup", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(req.body, (error, createdUser) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        else {
            console.log("user has been registered")
            res.status(201).json(createdUser)
        }
  });
});
//--------------------------------------------
// USER LOGIN ROUTE (CREATE SESSION ROUTE)
//--------------------------------------------
users.post('/login', (req, res) => {
  User.findOne({ username: req.body.username}, (error, foundUser) => {
    if (error) {
      res.send(error)
    } else {
      if (foundUser) {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser
          console.log(`${req.body.username} has been logged in!`)
          res.status(200).json(foundUser)
        }
        else {
          res.status(404).json({ error: 'User Not Found'})
        }
      } else {
        res.status(400).json({error: error})
      }
    }
  })
})
//--------------------------------------------

//--------------------------------------------
// SHOW USER IN DATABASE
// AT
// http://localhost:3003/users/:id
// OR
// https://pixel-progress-back-end.herokuapp.com/goals/:id
//--------------------------------------------
users.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) return res.status(500).send(err);
    res.send(foundUser);
  });
});
//--------------------------------------------
// SHOW USERS IN DATABASE
// AT
// http://localhost:3003/users/
// OR
// https://pixel-progress-back-end.herokuapp.com/goals
//--------------------------------------------
users.get("", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});
//--------------------------------------------
// Update User via Postman
//--------------------------------------------
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

//////////////...QA PROGRESSION...//////////////

//--------------------------------------------
// USER LOGOUT ROUTE (DELETE/DESTROY SESSION ROUTE)
//--------------------------------------------

users.delete('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({msg: 'user logged out'})
  })
})

//--------------------------------------------
// DELETE USER
//--------------------------------------------
// users.delete("/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err, user) => {
//     if (err) return res.status(500).send(err);
//     const response = {
//       message: "User successfully deleted",
//       id: user._id
//     };
    // return res.status(200).send(response);
//   });
// });

module.exports = users;
