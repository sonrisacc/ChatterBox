require('../db/dbConnection');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const chatSockets = require('./sockets/chat-socket.js');
const router = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

app.use(cors());

// app.use(express.static('public'));
app.use('/api', router);

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';
const server = http.createServer(app);

// static file server
server.listen(PORT, () => {
  console.log(`listening on http://${HOST}:${PORT}`);
});

// socketio server
const io = socketio().listen(server);
app.io = io;
chatSockets(io);
