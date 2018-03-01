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

export function emitNewMsg(username, msg) {
  socket.emit('newMsg', { username, msg });
}

export function emitUserLeft(name) {
  console.log('user left fired', name);
  socket.emit('userLogOff', { username: name });
}

export function emitTypingEvent(name) {
  console.log('need debounce', name);
  // socket.emit('userTyping', name);
}

export function receiveNewUser(cb) {
  socket.on('newUserOnline', data => cb(data));
}

export function receiveOffLineUser(cb) {
  socket.on('newUserOffline', data => cb(data));
}

export function receiveOneUserTyping(cb) {
  socket.on('oneUserTyping', data => cb(data));
}

export function receiveNewMessage(cb) {
  socket.on('oneNewMessage', data => {
    console.log('receiveNewMessage', data);
    cb(data);
  });
}
