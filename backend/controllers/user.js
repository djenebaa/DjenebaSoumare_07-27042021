"use strict";
const Employee = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const mysql = require("mysql");
require("dotenv").config();
// *****************
exports.login = (req, res) => {
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString("base64");
  db.query(
    `SELECT * FROM users WHERE email='${cryptedEmail}'`,
    (err, results) => {
      if (results.length > 0) {
        //Comparaison des mots de pass
        bcrypt.compare(req.body.password, results[0].password).then((valid) => {
          //Mots de passe pas ok
          if (!valid) {
            res.status(401).json({
              message: "Mot de passe incorrect.",
            });
            //mots de passe ok
          } else {
            res.status(200).json({
              userId: results[0].id,
              first_name: results[0].first_name,
              last_name: results[0].last_name,
              age: results[0].age,
              token: jwt.sign(
                {
                  userId: results[0].id,
                },
                process.env.DB_TOKEN,
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    }
  );
};
// ************************
exports.logout = function (req, res) {
  // res.cookie('jwt', '', { maxAge: 1 });
  // res.redirect('/');
};
// **************************
exports.users = function (req, res) {
  Employee.findAll(function (err, employee) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", employee);
    res.send(employee);
  });
};
// ***************************
exports.createone = (req, res) => {
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString("base64");
  db.query(
    `SELECT * FROM users WHERE email='${cryptedEmail}'`,
    (err, results) => {
      //Email non disponible
      if (results.length > 0) {
        res.status(401).json({
          message: "Email non disponible.",
        });
      } else {
        //hashage du mots de passe
        bcrypt
          .hash(req.body.password, 10)
          .then((cryptedPassword) => {
            //envoie a la base de donnée
            db.query(
              `INSERT INTO users VALUES (NULL, '${req.body.first_name}', '${req.body.last_name}','${req.body.age}','${req.body.position}','${cryptedEmail}','${cryptedPassword}')`,
              (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json("erreur");
                }
                return res.status(201).json({
                  message: "Compte crée",
                });
              }
            );
          })
          .catch((error) =>
            res.status(500).json({
              error,
            })
          );
      }
    }
  );
};
// ***********************************
exports.user = function (req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json(employee);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Employee.update(
      req.params.id,
      new Employee(req.body),
      function (err, employee) {
        if (err) res.send(err);
        res.json({ error: false, message: "Employee successfully updated" });
      }
    );
  }
};
exports.delete = function (req, res) {
  Employee.delete(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json({ error: false, message: "Employee successfully deleted" });
  });
};

//  const new_employee = new Employee(req.body);
// //   handlle null error
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     Employee.create(new_employee, function (err, user) {
//       if (err) res.send(err);
//       res.json({
//         error: false,
//         message: "Employee added successfully!",
//         data: user,
//       });
//     });
//   }

// bcrypt
//   .hash(req.body.password, 10)
//   .then((hash) =>{
//     const first_name= req.body.first_name;
//     const last_name= req.body.last_name;
//     const age= req.body.age;
//     const position= req.body.position;
//     const email= req.body.email;
//     const password= hash;
//     console.log(email);
//     const envoie =
//     " INSERT INTO users (first_name, last_name, age, position, email, password) VALUES ('"+
//     first_name +
//     "', '" +
//     last_name +
//     "', '" +
//     age +
//     "', '" +
//     position +
//     "', '" +
//     email +
//     "', '" +
//     password +
//     "')" ;
//     const Inscr = db.query(envoie, (error, res)=>{
//       if (!error) {
//         res.send(201).json({message:"Utilisateur crée"})
//       } else {
//         console.log("erreur de req");
//       }
//     });
//     console.log("hash ok");

//   })
//   .catch((error)=>
//   res.send(500).json({
//     error:"hash pas ok",
//   })
