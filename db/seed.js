const chatsDB = require('./dbConnection');

const msn = require('./smartyData/dummyMsn.json');
const users = require('./smartyData/smartyUsers.json');
const rooms = require('./smartyData/dummyRooms.json');

const Message = require('./models/Message.js');
const User = require('./models/User.js');
const Room = require('./models/Room.js');

// const onInsert = (err, docs) => {
//   if (err) {
//     console.error.bind(console, 'connection error:');
//   } else {
//     console.info('data successfully stored.', docs.insertedCount);
//   }
// };

const seedUser = () =>
  new Promise(resolve => {
    User.collection.insert(users, (err, docs) => {
      if (err) {
        console.error.bind(console, 'connection error:');
      } else {
        console.info('Total users successfully stored :', docs.insertedCount);
        resolve();
      }
    });
  });

const seedMsn = () =>
  new Promise(resolve => {
    Message.collection.insert(msn, (err, docs) => {
      if (err) {
        console.error.bind(console, 'connection error:');
      } else {
        console.info('Total msns successfully stored :', docs.insertedCount);
        resolve();
      }
    });
  });

const seedRoom = () =>
  new Promise(resolve => {
    Room.collection.insert(rooms, (err, docs) => {
      if (err) {
        console.error.bind(console, 'connection error:');
      } else {
        console.info('Total rooms successfully stored :', docs.insertedCount);
        resolve();
      }
    });
  });

chatsDB
  .dropDatabase()
  .then(seedUser)
  .then(seedMsn)
  .then(seedRoom)
  .then(() => {
    chatsDB.close();
    console.log('Database seeded and closed!');
  });

/* clear one collection */
// const cleanMessage = () =>
//   Message.remove({}, err => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Message Collection Cleared');
//     }
//   });
