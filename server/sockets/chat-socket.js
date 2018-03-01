const utli = require('../controlers/messageCtrl.js');

module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    const onLineUser = Object.keys(io.sockets.sockets);
    console.log('onLineUser', onLineUser);
    console.log('cur socket connected: ', socket.id);
    // setInterval(() => io.emit('time', new Date().toTimeString()), 10000);
    socket.emit('news', { hello: 'world' });
    socket.on('myTestEvent', data => {
      console.log(data);
    });

    socket.on('userLogIn', data => {
      socket.broadcast.emit('newUserOnline', data);
      io.emit('updateOnineUserNumber', onLineUser.length);
    });

    socket.on('userLogOff', data => {
      console.log('one user userLogOff', data);
      socket.broadcast.emit('newUserOffline', data);
      io.emit('updateOnineUserNumber', onLineUser.length);
    });

    socket.on('newMsg', data => {
      console.log('newMsg written', data);
      // save to database then
      utli.addNewMessages(data).then(res => {
        console.log('newMsg saved to db', res);
        io.emit('oneNewMessage', data);
      });
    });

    socket.on('test', data => {
      console.log('I am typing', data);
      socket.broadcast.emit('oneUserTyping', data);
    });

    socket.on('disconnect', () => {
      console.log('me disconnected', socket.id);
      socket.broadcast.emit('newUserOffline', socket.id);
    });
  });
};
