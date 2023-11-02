const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const verifyToken = require("../verifyToken");

//createPost

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// updatePostComments
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//deletePostComment

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.deleteMany(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post comments

router.get("/post/:postId", async (req, res) => {
  try {
    const posts = await Post.find({ postId: req.params.postId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user PostsComment
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
