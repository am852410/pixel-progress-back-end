const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    goals: Array
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
