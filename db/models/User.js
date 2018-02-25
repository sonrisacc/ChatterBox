const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: 'Please enter username.'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
