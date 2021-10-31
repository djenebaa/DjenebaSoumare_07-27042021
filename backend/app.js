const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

// *************securite
const helmet = require("helmet");
require("dotenv").config();
const Userroute = require("./routes/user");
const Postroute = require("./routes/post");
const Commentroute = require("./routes/comment");
const requireAuth= require('./middleware/auth')
const cookieParser = require("cookie-parser");
const session = require("express-session");
// *************

const app = express();
app.use(helmet());
// **********************Acceder a l'api sans probleme
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials",true)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// ******************************
app.use(session({
  key:'userId',
  secret:"subscribe",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires: 60*60*24
  }
}))
app.use(cookieParser())
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "images")));

// *******************
app.get('/jwtid',requireAuth, (req, res) => {
  res.status(200).send("good")
});
// *********************Route
app.use("/api/user", Userroute);
app.use("/api/post", Postroute);
app.use("api/comment", Commentroute);

module.exports = app;
