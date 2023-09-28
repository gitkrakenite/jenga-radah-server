const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    story: { type: String, required: true },
    photo: { type: String, required: true },
    creator: { type: String, required: true },
    comments: [commentSchema],
    likes: [likeSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
