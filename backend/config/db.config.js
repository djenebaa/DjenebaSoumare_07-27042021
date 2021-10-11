"use strict";
const mysql = require("mysql");
//local mysql db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employees_office",
});
db.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = db;