const express = require('express');
const app = express.Router();
const user = require("../controllers/user")
const passwordcheck = require('../middleware/password');
const auth = require("../middleware/auth");
const {authPage} = require("../middleware/auth-role");
const multer = require('../middleware/multer-config')

    app.post("/sign",passwordcheck,user.createone);
    app.post("/login", user.login);
    app.get("/login",auth, user.userlogin)
    app.get("/logout", user.logout)
    app.get("/", user.users);
    app.get("/admin",authPage(["Admin"]),auth, user.users);
    app.get("/:id",auth, user.user);
    app.put("/:id",multer, user.update);
    app.delete("/:id",auth, user.delete);

module.exports = app;
