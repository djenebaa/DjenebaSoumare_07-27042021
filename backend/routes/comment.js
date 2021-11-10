const express = require("express");
const app = express.Router();
const post = require("../controllers/comment");
const auth = require("../middleware/auth");

app.get("/",auth, post.getcomment)
app.post("/", post.createcomment);
app.put("/:id",auth, post.updatecomment);
app.delete("/:id",auth, post.deletecomment)

module.exports = app;