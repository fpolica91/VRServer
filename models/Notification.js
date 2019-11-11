const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const notificationSchema = new Schema({
  type: String,
  event: String,
  toWho: {type: Schema.Types.ObjectId, ref: 'User'},
  fromWho: {type: Schema.Types.ObjectId, ref: 'User'},
  seen: {
    type: Boolean,
    default: false
  },
  imageTo: {type: Schema.Types.ObjectId, ref: 'Post'}

}, {
  timestamps: true
})

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification