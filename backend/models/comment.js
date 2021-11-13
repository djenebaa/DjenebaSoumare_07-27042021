var dbConn = require("../config/db.config");

//Employee object create
let Comment = function (com) {
  this.user_id = com.user_id;
  this.post_id = com.post_id;
  this.date = new Date();
  this.comment = com.comment;
};

Comment.create = function (newcomment, result) {
   dbConn.query("INSERT INTO comment set ?", newcomment, function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };
  
Comment.find = function (post_id, result) {
   dbConn.query("Select * from comment where post_id = ?", 
   post_id,
   function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("employees : ", res);
        result(null, res);
      }
    });
  };

  
Comment.update = function (id, comment, result) {
    dbConn.query(
      "UPDATE comment SET comment=? WHERE `id` = ? ",
      [
        comment.comment,
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

Comment.delete = function (id, result) {
  dbConn.query("DELETE FROM comment WHERE id = ?", [id], function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
  }; 

module.exports = Comment;
