const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
    required: true
  },
  likes: [{ type: Schema.Types.ObjectId, "ref": "User"}],
  owner: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  tags: [String]
},
{
  timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;