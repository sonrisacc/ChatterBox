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

exports.addNewRoom = roomName =>
  new Promise((resolve, reject) => {
    Room.findOne({ roomname: roomName }, err => {
      if (err) {
        console.error('err', err);
        reject();
      }
    }).then(data => {
      if (data === null) {
        const newRoom = new Room({ roomname: roomName });
        newRoom.save((err, doc) => {
          if (err) {
            console.log(err);
            reject();
          }
          console.log('new message saved from userCtrl');
          resolve(doc);
        });
      } else if (data !== null) {
        resolve(null);
      }
    });
  });
