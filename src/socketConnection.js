const io = require('socket.io-client');

const url = process.env.HEROKU_URL || 'http://localhost:3033/';

const socket = io.connect(url);
// const chatSocket = io('/chat');
module.exports = socket;
