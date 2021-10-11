const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
// *************securite
const helmet = require("helmet");
require("dotenv").config();

const Userroute = require("./routes/user");
const Postroute = require("./routes/post");
const Commentroute = require("./routes/comment");

// *************
const app = express();
app.use(helmet());
// **********************Acceder a l'api sans probleme
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use("/images", express.static(path.join(__dirname, "images")));
// *********************Route
app.use("/api/user", Userroute);
app.use("/api/post", Postroute);
app.use("api/comment", Commentroute);

module.exports = app;
