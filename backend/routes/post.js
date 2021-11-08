const express = require("express");
const app = express.Router();
const post = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// const multer = require("multer");
// const upload = multer();


app.get("/:id",auth,post.getpost);
app.get("/", post.getallpost);
app.post("/create",auth, multer, post.create);
app.put("/:id",auth, multer, post.update);
app.delete("/:id",auth, post.delete);
app.post("/:id/like",auth, post.createLike);

module.exports = app;
