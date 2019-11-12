const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: String

},
  {
    timestamps: true
  })



const postSchema = new Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
    required: true
  },
  likes: [{ type: Schema.Types.ObjectId, "ref": "User" }],
  owner: {
    type: Schema.Types.ObjectId, ref: "User"
  },
  tags: [String],
  comments: [Comment],

  coordinates: {
    lat: Number,
    long: Number
  }

},
  {
    timestamps: true
  })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;