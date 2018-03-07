const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 1;

const roomSchema = new mongoose.Schema(
  {
    roomname: {
      type: String,
      trim: true,
      required: 'Please enter roomname.'
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false
    },
    password: {
      type: String,
      required: true,
      deafult: '1234',
      select: true
    }
  },
  { timestamps: true }
);

roomSchema.pre('save', function test(next) {
  const room = this;

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    return bcrypt.hash(room.password, salt, (error, hash) => {
      if (error) return next(err);

      // override the cleartext password with the hashed one
      room.password = hash;
      return next();
    });
  });
});

roomSchema.methods.pwdCheck = function test(inputPwd, cb) {
  bcrypt.compare(inputPwd, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
