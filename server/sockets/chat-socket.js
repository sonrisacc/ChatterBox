const utli = require('../controlers/messageCtrl.js');

module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    const onLineUser = Object.keys(io.sockets.sockets);
    console.log('onLineUser', onLineUser);
    console.log('cur socket connected: ', socket.id);

    socket.on('userLogIn', data => {
      socket.broadcast.emit('newUserOnline', data);
      console.log('userLogIn.length', onLineUser.length);
      io.emit('updateOnineUserNumber', onLineUser.length);
    });

    socket.on('userLogOff', data => {
      socket.broadcast.emit('newUserOffline', data);
      io.emit('updateOnineUserNumber', onLineUser.length - 1);
    });

    socket.on('newMsg', data => {
      utli.addNewMessages(data).then(res => {
        io.emit('oneNewMessage', res);
      });
    });

    socket.on('oneDeletedMsg', data => {
      utli.deleteMessages(data).then(res => {
        io.emit('oneNewMessage', res);
      });
    });

    socket.on('user is typing', data => {
      socket.broadcast.emit('oneUserTyping', data);
    });

    socket.on('user stopped typing', data => {
      socket.broadcast.emit('oneUserStoppedTyping', data);
    });

    socket.on('disconnect', () => {
      console.log('cur socket disconnected', socket.id);
      socket.broadcast.emit('newUserOffline', socket.id);
    });
  });
};
