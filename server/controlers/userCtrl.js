const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const User = mongoose.model('User');

exports.checkUserExists = userName =>
  new Promise((resolve, reject) => {
    User.findOne({ username: userName }, err => {
      if (err) {
        console.error('err', err);
      }
    })
      .then(data => {
        // console.log('this is the user', data);
        resolve(data);
      })
      .catch(err => {
        console.error('err', err);
        reject(err);
      });
  });

exports.addNewUser = userName =>
  new Promise((resolve, reject) => {
    User.findOne({ username: userName }, err => {
      if (err) {
        console.error('err', err);
        reject();
      }
    }).then(data => {
      if (data === null) {
        const newUser = new User({ username: userName });
        newUser.save();
        resolve(userName);
      } else if (data !== null) {
        resolve(null);
      }
    });
  });
