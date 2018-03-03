const utli = require('../controlers/messageCtrl.js');

const defaultRoom = 'Lobby';
const usernames = {};
let numUsers = 0;

module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    // const onLineUser = Object.keys(io.sockets.sockets);

    socket.on('userLogIn', data => {
      const { username } = data;
      socket.username = username; // eslint-disable-line
      socket.room = defaultRoom; // eslint-disable-line
      usernames[username] = socket.id;
      numUsers += 1;
      socket.join(defaultRoom);
      socket.broadcast.emit('newUserOnline', data);
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
      numUsers -= 1;
      delete usernames[username];
      socket.broadcast.emit('newUserOffline', data);
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
      console.log('cur socket disconnected', socket.id);
      socket.broadcast.emit('newUserOffline', socket.id);
      socket.leave(socket.room);
    });
  });
};
