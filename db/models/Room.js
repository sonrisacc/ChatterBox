const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const messageSchema = new mongoose.Schema(
  {
    roomname: {
      type: String,
      trim: true,
      required: 'Please enter roomname.'
    }
  },
  { timestamps: true }
);
const Room = mongoose.model('Room', messageSchema);
module.exports = Room;
