const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Room = mongoose.model('Room');

exports.loadRoom = () =>
  new Promise((resolve, reject) => {
    Room.find({}, err => {
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
        const newRoom = new Room({ roomname, isPrivate: bool, password });
        newRoom.save((err, doc) => {
          if (err) {
            console.log(err);
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
