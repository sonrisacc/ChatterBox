require('./dbConnection');
const mongoose = require('mongoose');

const msn = require('./smartyData/dummyMsn.json');
const users = require('./smartyData/smartyUsers.json');

const Message = require('./models/Message.js');
const User = require('./models/User.js');

const onInsert = (err, docs) => {
  if (err) {
    console.error.bind(console, 'connection error:');
  } else {
    console.info('data successfully stored.', docs.insertedCount);
  }
};

const seedDB = () =>
  new Promise(resolve => {
    User.collection.insert(users, onInsert);
    Message.collection.insert(msn, onInsert);
    resolve();
  });

const cleanMessage = () =>
  Message.remove({}, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Message Collection Cleared');
    }
  });

const cleanUser = () =>
  User.remove({}, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('User Collection Cleared');
    }
  });

cleanUser()
  .then(cleanMessage)
  .then(seedDB)
  .then(() => {
    mongoose.connection.close();
    console.log('Database seeded and closed!');
  });
