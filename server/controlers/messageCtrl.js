const mongoose = require('mongoose');

const Message = mongoose.model('Message');

exports.loadMessages = () =>
  new Promise((resolve, reject) => {
    Message.find({}, err => {
      if (err) {
        console.error('err', err);
      }
    })
      .sort({ createdAt: 1 })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });
