"use strict";
const Employee = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.config");
const { createTokens } = require("../middleware/JWT");

exports.login=(req,res)=>{
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString("base64");
  db.query(`SELECT * FROM users WHERE email='${cryptedEmail}'`, (err,user) => {
    if (user.length > 0) {
      bcrypt.compare(req.body.password, user[0].password).then((valid) => {
        if (!valid) {
          res.json({ auth: false, message: "wrong username/password" });
          res.status(401).json({
            message: "Mot de passe incorrect.",
          });
        } else {  
          req.session.user= user;
          const accessToken = createTokens(user)
          res.cookie("accessToken", accessToken, {
            maxAge: 3 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: "none",
          }); 
          res.status(200).json({
            userId: user[0].id,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            age: user[0].age,
            role:user[0].Role,
            token: jwt.sign(
              {
                userId: user.id,
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
      res.json({ auth: false, message: "no user exist" });
    }
  });
}
// ************************* Vérification si connecter
exports.userlogin = function (req, res) {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};
// ************************ Déconnexion
exports.logout = function (req, res) {
  res.cookie('userId', '', { maxAge: 1 });
  res.cookie('accessToken','', {maxAge:1})
  res.redirect('/');
  
};
// ************************** Get tout les users
exports.users = function (req, res) {
  Employee.findAll(function (err, employee) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", employee);
    res.send(employee);
  });
};
// *************************** Créer un user
exports.createone = (req, res) => {
  const buffer = Buffer.from(req.body.email);
  const cryptedEmail = buffer.toString("base64");

  db.query(`SELECT * FROM users WHERE email='${cryptedEmail}'`, (err, user) => {
    if (user.length > 0) {
      res.status(401).json({
        message: "Email non disponible.",
      });
    } else {
      bcrypt
        .hash(req.body.password, 10)
        .then((haspassword) => {
          db.query(
            `INSERT INTO users VALUES (NOT NULL,'${req.body.first_name}', '${req.body.last_name}','${req.body.age}','${req.body.position}','${cryptedEmail}','${haspassword}','${req.body.photo}','${req.body.role}')`,
            (err, results) => {
              if (err) {
                console.log(err);
                return res.status(400).json("Error");
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
  });
};
// *********************************** Get un user par id 
exports.user = function (req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json(employee)///ou json ?
  });
};
// ***************************** Mettre a jour la photo de profil
exports.update = function (req, res) {
   const post = new Employee({
    photo: `${req.protocol}://${req.get("host")}/images/${
          req.body.filename
        }`, 
   });
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Employee.update(
      req.params.id,
      post,
      function (err, employee) {
        if (err) res.send(err);
        res.json({ error: false, message: "Employee successfully updated" });
      }
    );
  }
};
// ****************************** Supprimer son compte

exports.delete = function (req, res) {
  Employee.delete(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json({ error: false, message: "Employee successfully deleted" });
  });
};

