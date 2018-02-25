module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    console.log('socket connected: ', socket.id);
    socket.emit('news', { hello: 'world' });
    socket.on('myTestEvent', data => {
      console.log(data);
    });
  });
};
