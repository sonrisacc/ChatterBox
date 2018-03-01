import socket from '../socketConnection';

// socket.on('time', timeString => {
//   console.log(`Server time: ${timeString}`);
// });
// socket.on('news', data => {
//   console.log(data);
//   socket.emit('myTestEvent', { my: 'data' });
// });
export function emitNewUser(name) {
  socket.emit('userLogIn', { username: name });
}

export function emitUserLeft(name) {
  console.log('user left fired', name);
  socket.emit('userLogOff', { username: name });
}

export function receiveNewUser(cb) {
  socket.on('newUserOnline', data => cb(data));
}

export function receiveOffLineUser(cb) {
  socket.on('newUserOffline', data => cb(data));
}
