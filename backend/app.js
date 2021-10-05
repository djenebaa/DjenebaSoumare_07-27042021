const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
// ****************
const userRoutes = require("./routes/user");

// ************************ Connection a mysql
const db = mysql.createConnection({
  user: "root",
  host:"localhost",
  password: "password",
  database: "employees_office",

});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});
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

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(".api/auth", userRoutes);

module.exports = app;
