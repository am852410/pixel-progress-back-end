require("./app");
const express = require("express");
const app = express();
const cors = require("cors");
app.use("/goals", require("./Controllers/goals"));
// app.use("/users", require("./Controllers/users"));

app.listen(3000, () => {
  console.log("Server listening");
});
