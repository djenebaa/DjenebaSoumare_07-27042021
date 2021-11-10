var dbConn = require("../config/db.config");

//Employee object create
let Post = function (user) {
  this.post_name = user.post_name;
  this.date = new Date();
  this.photo = user.photo;
  this.userId = user.userId
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
      "Select * from post where id = ? ", 
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
 
  module.exports = Post;

