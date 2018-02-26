import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Provider } from 'react-redux';
import socket from '../socketConnection';
// import store from '../store/store';
import Landing from './Landing';
import Lobby from './Lobby';
import PageNotFound from './PageNotFound';

class App extends Component {
  render() {
    socket.on('time', timeString => {
      console.log(`Server time: ${timeString}`);
    });
    socket.on('news', data => {
      console.log(data);
      socket.emit('myTestEvent', { my: 'data' });
    });
    return (
      <BrowserRouter>
        {/* <Provider store={store}> */}
        <div className="app">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/lobby" component={Lobby} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
        {/* </Provider> */}
      </BrowserRouter>
    );
  }
}

export default App;
