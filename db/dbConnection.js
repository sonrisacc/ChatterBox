const mongoose = require('mongoose');

const url =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://127.0.0.1/chats';
mongoose.connect(url);

const chats = mongoose.connection;

chats.on('error', console.error.bind(console, 'connection error:'));
chats.once('open', () => {
  console.log('connected to MongoDB');
});

module.exports = chats;
