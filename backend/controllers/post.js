const Post = require("../models/post");


// One post 
exports.getpost = (req, res) => {
  Post.findOne(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json(employee);
  });
};
// All post
exports.getallpost = (req, res) => {
 Post.findAll(function (err, employee) {
      console.log("controller");
      if (err) res.send(err);
      console.log("res", employee);
      res.send(employee);
    });

};


exports.create = (req, res) => {
   const post = new Post({
    photo: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, 
    post_name: req.body.post_name,
    date: req.body.date,
    userId:req.body.userId, 
  }); 
  console.log(post);
  //   handlle null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      Post.createpost(post, function (err, post) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "posted !",
          data: post,
        });
      });
    }
};

exports.update = (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Post.update(
      req.params.id,
      new Post(req.body),
      function (err, post) {
        if (err) res.send(err);
        res.json({ error: false, message: "Post successfully updated" });
      }
    );
  }
};




// Delete
exports.delete = (req, res) => {
  Post.delete(req.params.id, function (err, employee) {
    if (err) res.send(err);
    res.json({ error: false, message: "Post successfully deleted" });
  });
  };

