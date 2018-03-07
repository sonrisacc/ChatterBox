const utli = require('../controlers/messageCtrl.js');
const utliR = require('../controlers/roomCtrl.js');

const defaultRoom = 'Lobby';
const usernames = {};
let numUsers = 0;

module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    // const onLineUser = Object.keys(io.sockets.sockets);
    io.emit('cur online user list', usernames);

    socket.on('userLogIn', data => {
      const { username } = data;
      socket.username = username; // eslint-disable-line
      socket.room = defaultRoom; // eslint-disable-line
      usernames[username] = socket.id;
      numUsers = Object.keys(usernames).length;
      socket.join(defaultRoom);
      socket.broadcast.emit('newUserOnline', data);
      io.emit('cur online user list', usernames);
      io.emit('updateOnineUserNumber', numUsers);
      console.log(
        'cur user.room',
        username,
        'is in',
        socket.room,
        'total',
        numUsers
      );
    });

    socket.on('userLogOff', data => {
      const { username } = data;
      delete usernames[username];
      numUsers = Object.keys(usernames).length;
      socket.broadcast.emit('newUserOffline', data);
      io.emit('cur online user list', usernames);
      io.emit('updateOnineUserNumber', numUsers);
      socket.leave(socket.room);
    });

    socket.on('switchRoom', newRoom => {
      console.log('switchRoom to: ', newRoom);
      socket.leave(socket.room);
      socket.join(newRoom);
      socket.room = newRoom; // eslint-disable-line
      console.log('cur user.room', socket.username, 'is in', socket.room);
    });

    socket.on('newMsg', data => {
      utli.addNewMessages(data).then(res => {
        io.sockets.in(socket.room).emit('oneNewMessage', res);
      });
    });

    socket.on('newRoom', data => {
      console.log('newRoom', data);
      utliR.addNewRoom(data).then(res => {
        io.sockets.emit('oneNewRoom', res);
      });
    });

    socket.on('oneDeletedMsg', data => {
      utli.deleteMessages(data).then(res => {
        io.sockets.in(socket.room).emit('oneNewMessage', res);
      });
    });

    socket.on('user is typing', data => {
      socket.in(socket.room).broadcast.emit('oneUserTyping', data);
    });

    socket.on('user stopped typing', data => {
      socket.in(socket.room).broadcast.emit('oneUserStoppedTyping', data);
    });

    socket.on('disconnect', () => {
      delete usernames[socket.username];
      numUsers = Object.keys(usernames).length;
      io.sockets.emit('newUserOffline', { username: socket.username });
      io.sockets.emit('updateOnineUserNumber', numUsers);
      socket.leave(socket.room);
    });
  });
};
