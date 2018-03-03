const mongoose = require('mongoose');

const Message = mongoose.model('Message');

exports.loadMessages = () =>
  new Promise((resolve, reject) => {
    Message.find({}, err => {
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

exports.addNewMessages = data =>
  new Promise((resolve, reject) => {
    let newMsg;

    if (data.deadline !== 0) {
      newMsg = new Message({
        author: data.username,
        message: data.msg,
        destructAt: data.deadline,
        selfDestruct: true
      });
    } else {
      newMsg = new Message({
        author: data.username,
        message: data.msg,
        destructAt: -1,
        selfDestruct: false
      });
    }
    newMsg.save((err, doc) => {
      if (err) {
        console.err(err);
        reject();
      }
      resolve(doc);
    });
  });

exports.deleteMessages = data =>
  new Promise((resolve, reject) => {
    Message.findByIdAndRemove(data, (err, doc) => {
      if (err) {
        console.err(err);
        reject();
      }
      resolve(doc);
    });
  });
