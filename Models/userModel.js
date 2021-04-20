const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
