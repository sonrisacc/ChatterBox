import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import socket from '../socketConnection';

class App extends Component {
  render() {
    socket.on('news', data => {
      console.log(data);
      socket.emit('myTestEvent', { my: 'data' });
    });
    return <div>Hello testing</div>;
  }
}

export default App;
