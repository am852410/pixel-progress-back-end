const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    type: { type: Array, default: [] },
    days: { type: Array, default: [] },
    week_start_dates: { type: Array, required: true },
    categories: { type: Array, default: [] },
    user_id: { type: String, required: true },
    completed_tasks: { type: Array, default: [] }
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
