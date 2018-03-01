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
    const newMsg = new Message({ author: data.username, message: data.msg });
    newMsg.save((err, doc) => {
      if (err) {
        console.log(err);
        reject();
      }
      console.log('new message saved from msgCtrl');
      resolve(doc);
    });
  });
