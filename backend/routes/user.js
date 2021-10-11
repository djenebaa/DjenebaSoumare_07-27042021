const express = require('express');
const app = express.Router();
const user = require("../controllers/user")


    app.post("/sign", user.createone);
    app.post("/login", user.login)
    app.get("/logout", user.logout)
    app.get("/", user.users);
    app.get("/:id", user.user);
    app.put("/:id", user.update);
    app.delete("/:id", user.delete);
    

module.exports = app;
