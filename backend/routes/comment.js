const express = require("express");
const app = express.Router();
const user = require("../controllers/comment")


app.post("/:id", user.createcomment);
app.put("/:id", user.updatecomment);
app.delete(":id", user.deletecomment);

module.exports = app;