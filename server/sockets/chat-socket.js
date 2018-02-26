module.exports = io => {
  console.log('io running');
  io.on('connection', socket => {
    console.log('socket connected: ', socket.id);
    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
    socket.emit('news', { hello: 'world' });
    socket.on('myTestEvent', data => {
      console.log(data);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
  });
};
