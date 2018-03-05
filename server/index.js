require('../db/dbConnection');
require('babel-register');
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const chatSockets = require('./sockets/chat-socket.js');
const router = require('./routes');
const auth = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing application/x-www-form-urlencoded

app.use(cors());

app.use(express.static('public'));
app.use('/api', router);
app.use('/auth', auth);
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

const PORT = process.env.PORT || 1111;
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
