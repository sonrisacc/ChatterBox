const mongoose = require('mongoose');

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1/chatsDB';
mongoose.connect(url);

const chatsDB = mongoose.connection;

chatsDB.on('error', console.error.bind(console, 'connection error:'));
chatsDB.once('open', () => {
  console.info('connected to MongoDB');
});

module.exports = chatsDB;
