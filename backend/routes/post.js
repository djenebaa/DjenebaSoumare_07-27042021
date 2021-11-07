const express = require("express");
const app = express.Router();
const post = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

app.get("/:id",post.getpost);
app.get("/", post.getallpost);
app.post("/create", multer, post.create);
app.put("/:id", multer, post.update);
app.delete("/:id", post.delete);
app.post("/:id/like", post.createLike);

module.exports = app;
