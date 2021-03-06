//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//DEPENDENCIES
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//--------------------------------------------
//DOTENV
require("dotenv").config();
//--------------------------------------------

//--------------------------------------------
//PORT
const PORT = process.env.PORT;
//--------------------------------------------

//--------------------------------------------
//EXPRESS/APP
const express = require("express");
const app = express();
//--------------------------------------------

//--------------------------------------------
//REQUIRE MONGOOSE
const mongoose = require("mongoose");
//--------------------------------------------

//--------------------------------------------
//REQUIRE CORS
const cors = require("cors");
//--------------------------------------------

//--------------------------------------------
//SESSION
const session = require("express-session");
//--------------------------------------------

//--------------------------------------------
//MONGO
const mongoURI = process.env.MONGODBURI;
const MongoDBStore = require("connect-mongodb-session")(session);

//--------------------------------------------
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%.M.I.D.D.L.E.W.A.R.E.%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//--------------------------------------------
//CORS SETUP
//--------------------------------------------
const whitelist = ["http://localhost:3000", "https://pixel-progress-frontend.herokuapp.com"];

const corsOptions = {
    "origin": whitelist,
    "methods": "GET,PUT,PATCH,POST,DELETE",
    "credentials" : true
}

// const corsOptions = {
//   "origin": (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   // credentials: true
// 	"methods": "GET,PUT,PATCH,POST,DELETE",
// };
app.use(cors(corsOptions));
//--------------------------------------------

//--------------------------------------------
//PROXY
//--------------------------------------------
// app.set("trust proxy", 1); // trust first proxy
//--------------------------------------------

//--------------------------------------------
//SESSION
//--------------------------------------------
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoDBStore({
//       uri: mongoURI,
//       collection: "mySessions"
//     }),
//     cookie: {
//       sameSite: "none",
//       secure: true
//     }
//   })
// );
//--------------------------------------------

//--------------------------------------------
//MONGOOSE SETUP
const db = mongoose.connection;
mongoose.connect(
  mongoURI,
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log("database connection checked");
  }
);
//--------------------------------------------

//--------------------------------------------
// DB CONNECTION LISTENERS
db.on("error", err => {
  console.log("ERROR: ", err);
});
db.on("connected", () => {
  console.log("mongo connected");
});
db.on("disconnected", () => {
  console.log("mongo disconnected");
});
//--------------------------------------------

//--------------------------------------------
//AUTHENTICATED
//--------------------------------------------
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.status(403).json({ msg: "login required" });
  }
};

//--------------------------------------------

//--------------------------------------------
//JSON
app.use(express.json());
//--------------------------------------------

//--------------------------------------------
//CONTROLLERS
//ADD ISAUTHENTICATED HERE - AFTER FE CONDITIONAL ADDED
// app.use("/goals", isAuthenticated, require("./Controllers/goals"));
app.use("/goals", require("./Controllers/goals"));
app.use("/users", require("./Controllers/users"));
//--------------------------------------------

//--------------------------------------------
//LISTEN
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
//--------------------------------------------

//--------------------------------------------
//TEMPLATE
//code
//--------------------------------------------

/////////////////////////
// ORIGINAL CODE - UNUSED
/////////////////////////
// const bodyParser = require("body-parser");
// const jsonParser = bodyParser.json();
app.use(express.urlencoded({ extended: true }));
