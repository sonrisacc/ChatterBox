const io = require('socket.io-client');

console.log('client', process.env.HEROKU_URL);
const url = process.env.HEROKU_URL || 'http://localhost:3033/';

const socket = io.connect(url);
// const socket = io();
// const chatSocket = io('/chat');
module.exports = socket;
