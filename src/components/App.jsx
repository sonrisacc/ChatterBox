import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import socket from '../socketConnection';

class App extends Component {
  render() {
    console.log('running');
    console.log('runnin222g');
    socket.on('news', data => {
      console.log(data);
      socket.emit('myTestEvent', { my: 'data' });
    });
    return <div>Helloasadasdasdasd</div>;
  }
}

export default App;
