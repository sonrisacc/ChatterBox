require('./dbConnection');
const msn = require('./smartyData/dummyMsn.json');
const users = require('./smartyData/smartyUsers.json');

const Message = require('./models/Message.js');
const User = require('./models/User.js');

const seedDB = () => {
  msn.forEach(cur => {
    const newMsn = new Message({
      author: cur.author,
      message: cur.message,
      selfDestruct: cur.selfDestruct,
      destructAt: cur.destructAt
    });

    newMsn.save(err => {
      if (err) {
        console.log(err);
      } else {
        console.log('new msn saved');
      }
    });
  });

  users.forEach(cur => {
    const newUser = new User({
      username: cur.username
    });
    newUser.save(err => {
      if (err) {
        console.log(err);
      } else {
        console.log('new user saved');
      }
    });
  });

  console.log('Database seeded!');
};

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

// const closeDB = () => mongoose.disconnect();
cleanUser()
  .then(cleanMessage)
  .then(seedDB);
