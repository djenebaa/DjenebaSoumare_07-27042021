const express = require("express");
const app = express.Router();
const user = require("../controllers/post")

app.get("/:id", user.getpost);
app.get("/", user.getallpost);
app.post("/", user.create);
app.put("/:id", user.update);
app.delete(":id", user.delete);
app.delete("/", user.deleteallpost);
app.post("/:id/like", user.createlike);

module.exports = app;
