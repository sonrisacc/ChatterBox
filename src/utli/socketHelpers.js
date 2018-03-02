import moment from 'moment';
import socket from '../socketConnection';

const lifeObj = {
  A: 0,
  B: 30,
  C: 60,
  D: 120,
  E: 300,
  F: 3600
};
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

export function emitNewMsg(username, msg, destructAt) {
  const lifespan = lifeObj[destructAt];
  const cur = moment();
  console.log('cur time', cur);
  let deadline;
  if (lifespan === 0) {
    deadline = lifespan;
  } else {
    deadline = cur
      .clone()
      .add(lifespan, 'second')
      .format();
  }
  console.log(deadline);
  deadline = JSON.stringify(deadline);
  socket.emit('newMsg', { username, msg, deadline });
}

export function emitUserLeft(name) {
  console.log('user left fired', name);
  socket.emit('userLogOff', { username: name });
}

export function emitTypingEvent(name) {
  console.log('need debounce test asdasd', name);
  socket.emit('test', name);
}

export function emitDeleteMessage(id) {
  socket.emit('oneDeletedMsg', id);
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

export function receiveOnlineUserNumber(cb) {
  socket.on('updateOnineUserNumber', data => cb(data));
}
