module.exports = io => {
  io.on('connection', socket => {
    console.log('socket connected: ', socket.id);
  });
};
