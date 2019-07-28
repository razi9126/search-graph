const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  postTitle: String,
  postSummary: String,
  tags: [String],
  verdict: Boolean
});

postSchema.index({
  postTitle: 1,
  postSummary: 1,
}, {
  unique: true,
});

const MyPosts = mongoose.model('myposts', postSchema); 

module.exports = {
  MyPosts
};