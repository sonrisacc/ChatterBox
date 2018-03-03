const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    room: {
      type: String,
      required: true
    },
    selfDestruct: {
      type: Boolean,
      required: true,
      default: false
    },
    destructAt: String
  },
  { timestamps: true }
);
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
