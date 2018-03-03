const mongoose = require('mongoose');

const Message = mongoose.model('Message');

exports.loadMessages = room =>
  new Promise((resolve, reject) => {
    Message.find({ room }, err => {
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
        room: data.room,
        destructAt: data.deadline,
        selfDestruct: true
      });
    } else {
      newMsg = new Message({
        author: data.username,
        message: data.msg,
        room: data.room,
        destructAt: -1,
        selfDestruct: false
      });
    }
    newMsg.save((err, doc) => {
      if (err) {
        console.error(err);
        reject();
      }
      resolve(doc);
    });
  });

exports.deleteMessages = data =>
  new Promise((resolve, reject) => {
    Message.findByIdAndRemove(data, (err, doc) => {
      if (err) {
        console.error(err);
        reject();
      }
      resolve(doc);
    });
  });
