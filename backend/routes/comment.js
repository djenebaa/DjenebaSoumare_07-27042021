const express = require("express");
const app = express.Router();
const post = require("../controllers/comment");
const auth = require("../middleware/auth");

app.get("/:id", post.getcomment)
app.post("/", post.createcomment);
app.put("/:id", post.updatecomment);
app.delete("/:id",auth, post.deletecomment)

module.exports = app;