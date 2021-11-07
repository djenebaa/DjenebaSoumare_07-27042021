var dbConn = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Employee object create
let Post = function (user) {
  this.post_name = user.post_name;
  this.date = new Date();
  this.photo = user.photo;
  this.like = user.like;
  this.userId = user.userId
  this.dislike = user.dislike;
  this.usersliked = user.usersliked;
  this.usersdisliked = user.usersdisliked
};

Post.createpost = function (newpost, result) {
    dbConn.query("INSERT INTO post set ?", newpost, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };
  
Post.findAll = function (result) {
    dbConn.query("Select * from post ORDER BY date desc", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("employees : ", res);
        result(null, res);
      }
    });
  };
  Post.findOne = function (id, result) {
    dbConn.query(
      "Select * from post where id = ? ",   //id user ?
      id,
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res);
        }
      }
    );
  };
  
  Post.update = function (id, post, result) {
    dbConn.query(
      "UPDATE post SET `post_name`=? WHERE `id` = ? ",
      [
        post.post_name,
        // post.photo,
        // post.like,
        // post.dislike,
        id,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  };
  Post.delete = function (id, result) {
    dbConn.query("DELETE FROM post WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }; 
  // **********************************************************************
  Post.createlike = (id, post, result) =>{
    dbConn.query(
      "Update post SET `like`=?,`dislike`=?, usersliked=?, usersdisliked=? WHERE `id` = ? ",
      [
        post.like,
        post.dislike,
        post.usersdisliked,
        post.usersliked,
        id,
      ],
      function (err, res) {
        if (err) {
          console.log("error: ", err);
          result(null, err);
        } else {
          result(null, res);
        }
      }
    );
  };
  module.exports = Post;

  // const post = new Post({
  //   like: req.body.like,
  //   dislike: req.body.dislike,
  //   usersliked: req.body.usersliked,
  //   usersdisliked:req.body.usersdisliked
  // }); 
  // console.log(post);
  // //   handlle null error
  //   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
  //     res
  //       .status(400)
  //       .send({ error: true, message: "Please provide all required field" });
  //   } else {
  //     Post.createpost(post, function (err, post) {
  //       if (err) res.send(err);
  //       res.json({
  //         error: false,
  //         message: "posted !",
  //         data: post,
  //       });
  //     });
  //   }