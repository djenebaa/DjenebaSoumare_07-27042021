const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// *****************Connection a mangodb
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "employeeSystem",
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
app.post("/create", (req, res) => {
  const movieName = req.body.name;
  const movieReview = req.body.age;
})

// app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/api/sauces", saucesRoutes);
// app.use("/api/auth", userRoutes);
module.exports = app;
