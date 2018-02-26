require('dotenv').config();
require('../db/dbConnection');
const http = require('http');
const app = require('./server.js');
const chatSockets = require('./sockets/chat-socket.js');

console.info('process.env.NODE_ENV', process.env.NODE_ENV);
const port = process.env.PORT || 3033;
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);
app.io = io;
chatSockets(io);

server.listen(port, 'localhost', () =>
  console.log('http server listening on port: ', port)
);
