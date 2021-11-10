const Comment = require("../models/comment");


exports.createcomment = (req, res) => {
    const comment = new Comment({
    user_id:req.body.user_id, 
    post_id: req.body.post_id,
    comment: req.body.comment,
    date: req.body.date,
  }); 
  console.log(comment);
  //   handlle null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      Comment.create(comment, function (err,  comment) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "posted !",
          data: comment,
        });
      });
    }
};


exports.updatecomment = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Comment.update(
      req.params.id,
      new Post(req.body),
      function (err, post) {
        if (err) res.send(err);
        res.json({ error: false, message: "Post successfully updated" });
      }
    );
  }
};


exports.deletecomment = (req, res) => {
  Comment.delete(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json({ error: false, message: "Comment successfully deleted" });
  });
};

exports.getcomment = (req, res) => {
 Comment.find(function (err, employee) {
      console.log("controller");
      if (err) res.send(err);
      console.log("res", employee);
      res.send(employee);
    });
};
