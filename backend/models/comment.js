var dbConn = require("../config/db.config");

//Employee object create
let Comment = function (comment) {
  this.user_id = comment.user_id;
  this.post_id = comment.post_id;
  this.date = new Date();
  this.comment = comment.comment;
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
  
Comment.find = function (result) {
   dbConn.query("Select * from comment ORDER BY date desc", function (err, res) {
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
