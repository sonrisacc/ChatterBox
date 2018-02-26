import React, { Component } from 'react';
import socket from '../socketConnection';

class Lobby extends Component {
  render() {
    socket.on('time', timeString => {
      console.log(`Server time: ${timeString}`);
    });
    socket.on('news', data => {
      console.log(data);
      socket.emit('myTestEvent', { my: 'data' });
    });
    return (
      <div className="lobby">
        <h1>This is lobby</h1>
      </div>
    );
  }
}

export default Lobby;
