const express = require("express");
const app = express.Router();
const post = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


app.get("/:id",auth, post.getpost);
app.get("/", post.getallpost);
app.post("/create",auth,multer, post.create);
app.put("/:id",auth, multer, post.update);
app.delete("/:id", post.delete);


module.exports = app;
