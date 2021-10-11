"use strict";
var dbConn = require("../config/db.config");
//Employee object create
var Employee = function (user) {
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.age = user.age;
  this.position = user.position;
  this.email = user.email;
  this.password = user.password;
};
Employee.create = function (newEmp, result) {
  dbConn.query("INSERT INTO users set ?", newEmp, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Employee.findById = function (id, result) {
  dbConn.query(
    "Select * from users where id = ? ",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
// Employee.findByemail = function (email, result) {
//   dbConn.query(
//     "Select email, password from users",
//     email,
//     function (err, res) {
//       if (err) {
//         console.log("error: ", err);
//         result(err, null);
//       } else {
//         result(null, res);
//       }
//     }
//   );
// }; 

Employee.findAll = function (result) {
  dbConn.query("Select * from users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("employees : ", res);
      result(null, res);
    }
  });
};
Employee.update = function (id, employee, result) {
  dbConn.query(
    "UPDATE users SET first_name=?,last_name=?,age=?,position=?,email=?,password=?WHERE id = ?",
    [
      employee.first_name,
      employee.last_name,
      employee.age,
      employee.position,
      employee.email,
      employee.password,
      id
    ],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
Employee.delete = function (id, result) {
  dbConn.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};
module.exports = Employee;
