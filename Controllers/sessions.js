const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Models/userModel')

router.get('/sessions', (req, res) => {
  console.log(`session get router`)
})

// USER LOGIN ROUTE (CREATE SESSION ROUTE)
router.post("/sessions", (req, res) => {
  console.log('login route starting...')
  console.log("login route username", req.body.username);

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
        res.status(400).json({ err: "User Not Found" });
      }
    }
  });
});


module.exports = router;
