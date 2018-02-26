require('dotenv').config();
require('../db/dbConnection');
// const chatSockets = require('./sockets/chat-socket.js');
// const http = require('http');
const app = require('./server.js');
// const socketio = require('socket.io');

console.info('process.env.NODE_ENV', process.env.NODE_ENV);

const PORT = process.env.PORT || 3033;

// const server = http.createServer(app);
app.listen(PORT, 'localhost', () =>
  console.log('http server listening on PORT: ', PORT)
);
//
// const io = socketio().listen(server);
//
// app.io = io;
//
// chatSockets(io);
