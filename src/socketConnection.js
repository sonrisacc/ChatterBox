const io = require('socket.io-client');

const socket = io.connect(process.env.URL);
// const chatSocket = io('/chat');
module.exports = socket;
