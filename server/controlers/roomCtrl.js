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
