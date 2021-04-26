const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const goalSchema = new Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    type: { type: String},
    days: { type: Array, default: [] },
    week_start_dates: { type: Array, required: true },
    categories: { type: Array, default: [] },
    user_id: { type: String, required: true },
    completed_tasks: { type: Array, default: [] }
  },
  { timestamps: true }
);

const Goal = model("Goal", goalSchema);

module.exports = Goal;
