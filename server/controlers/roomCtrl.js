const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Room = mongoose.model('Room');

// function hashPwd(password) {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//       if (err) reject(err);
//
//       bcrypt.hash(password, salt, (newErr, hash) => {
//         if (newErr) reject(newErr);
//         resolve(hash);
//       });
//     });
//   });
// }
//
// function comparePwd(inputpwd, docpwd, cb) {
//   bcrypt.compare(inputpwd, docpwd, (err, isMatch) => {
//     if (err) return cb(err);
//     return cb(null, isMatch);
//   });
// }
exports.loadRoom = () =>
  new Promise((resolve, reject) => {
    Room.find({}, 'roomname isPrivate', err => {
      if (err) {
        console.error('err', err);
      }
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .then(data => {
        data.reverse();
        resolve(data);
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });

exports.checkRoomPwd = (password, roomname) =>
  new Promise((resolve, reject) => {
    console.log('123345678', roomname);
    Room.findOne({ roomname }, (err, room) => {
      if (err) {
        console.error('err', err);
        reject();
      }
      console.log('room', room);
      room.pwdCheck(password, (error, isMatch) => {
        if (error) throw err;
        console.log('Password123:', isMatch); // -> Password123: true
        resolve(isMatch);
      });
    });
  });

exports.addNewRoom = data => {
  let bool;
  const { roomname, isPrivate, password } = data;
  if (isPrivate === 'on') {
    bool = true;
  } else {
    bool = false;
  }

  return new Promise((resolve, reject) => {
    Room.findOne({ roomname }, err => {
      if (err) {
        console.error('err', err);
        reject();
      }
    }).then(res => {
      if (res === null) {
        // hashPwd(password).then(hashedPwd => {
        const newRoom = new Room({
          roomname,
          isPrivate: bool,
          password
        });
        console.log('lllllll', newRoom);
        newRoom.save((error, doc) => {
          if (error) {
            console.log(error);
            reject();
          }
          console.log('new room saved from roomCtrl');
          resolve(doc);
        });
      } else if (res !== null) {
        resolve(null);
      }
    });
  });
};
