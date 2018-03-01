module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    console.log('socket connected: ', socket.id);
    // setInterval(() => io.emit('time', new Date().toTimeString()), 10000);
    socket.emit('news', { hello: 'world' });
    socket.on('myTestEvent', data => {
      console.log(data);
    });

    socket.on('userLogIn', data => {
      console.log('userLogIn', data);
      socket.broadcast.emit('newUserOnline', data);
    });

    socket.on('userLogOff', data => {
      console.log('one user userLogOff', data);
      socket.broadcast.emit('newUserOffline', data);
      // socket.disconnect();
    });

    socket.on('disconnect', () => {
      console.log('me disconnected', socket.id);
      socket.broadcast.emit('newUserOffline', socket.id);
    });
  });
};
