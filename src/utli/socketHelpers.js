import moment from 'moment';
import socket from '../socketConnection';

const lifeObj = {
  A: 0,
  B: 3,
  C: 5,
  D: 30,
  E: 60,
  F: 120,
  G: 300,
  H: 3600
};

export function emitNewUser(name) {
  console.log('emitNewUser running', name);
  socket.emit('userLogIn', { username: name });
}

export function emitNewMsg(username, msg, destructAt) {
  const lifespan = lifeObj[destructAt];
  const cur = moment();

  let deadline;
  if (lifespan === 0) {
    deadline = lifespan;
  } else {
    deadline = cur
      .clone()
      .add(lifespan, 'second')
      .format();
    deadline = JSON.stringify(deadline);
  }
  socket.emit('newMsg', { username, msg, deadline });
}

export function emitUserLeft(name) {
  console.log('user left fired', name);
  socket.emit('userLogOff', { username: name });
}

export function emitTypingEvent(name) {
  socket.emit('user is typing', name);
}

export function emitTypingEventStoped(name) {
  socket.emit('user stopped typing', name);
}

export function emitDeleteMessage(id) {
  socket.emit('oneDeletedMsg', id);
}

export function receiveNewUser(cb) {
  console.log('newUseronline');
  socket.on('newUserOnline', data => cb(data));
}

export function receiveOffLineUser(cb) {
  socket.on('newUserOffline', data => cb(data));
}

export function receiveOneUserTyping(cb) {
  socket.on('oneUserTyping', data => cb(data));
}

export function oneUserStoppedTyping(cb) {
  socket.on('oneUserStoppedTyping', data => cb(data));
}

export function receiveNewMessage(cb) {
  socket.on('oneNewMessage', data => {
    cb(data);
  });
}

export function receiveOnlineUserNumber(cb) {
  socket.on('updateOnineUserNumber', data => cb(data));
}
