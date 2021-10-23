const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Post = require("../models/post");
const User = require("../models/user")
const { user } = require("./user");

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

// Create
exports.create = (req, res) => {
  const post = new Post({
    photo: `${req.protocol}://${req.get("host")}/images/${
      req.body.photo
    }`,
    post_name: req.body.post_name,
    date: req.body.date,
    id: req.body.id,
    like: req.body.like,
    dislike: req.body.dislike,
    usersliked: req.body.usersliked,
    usersdisliked: req.body.usersdisliked
   
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
// Update
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


// Create like
// exports.createlike = (req, res) => {
//   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required field" });
//   } else {
//     Post.update(
//       req.params.id,
//       new Post(req.body),
//       function (err, post) {
//         if (err) res.send(err);
//         res.json({ error: false, message: "Post successfully updated" });
//       }
//     );
//   }
// };

exports.createLike = async (req, res) => {
  const like = new Post({
    like: req.body.like,
    dislike: req.body.dislike,
    usersliked: req.body.usersliked,
    usersdisliked: req.body.usersdisliked
  }); 
  let userid =req.body.id;
  // ********** like
  if (like === 1) {
    Post.createlike(
      { _id: req.params.id },
      { $push: { usersliked: userid }, $inc: { like: +1 } }
    )
      .then(() => res.status(200).json({ message: `like` }))
      .catch((error) => res.status(400).json({ error }));
  }
  // **************Dont like
  if (like === -1) {
    Post.createlike(
      { _id: req.params.id },
      { $push: { usersdisliked: userid }, $inc: { dislike: +1 } }
    )
      .then(() => {
        res.status(200).json({ message: `dont like` });
      })
      .catch((error) => res.status(400).json({ error }));
  }

  // ****************No like no Dislike
  if (like === 0) {
    Post.createlike({
      _id: req.params.id,
    })
      .then((like) => {
        if (like.usersliked.includes(userid)) {
          Post.createlike(
            { _id: req.params.id },
            { $pull: { usersliked: userid }, $inc: { like: -1 } }
          )
            .then(() => res.status(200).json({ message: `nothing` }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (like.usersdisliked.includes(userid)) {
          Post.createlike(
            { _id: req.params.id },
            { $pull: { usersdisliked: userid }, $inc: { dislike: -1 } }
          )
            .then(() => res.status(200).json({ message: `nothing` }))
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(404).json({ error }));
  }
 };
