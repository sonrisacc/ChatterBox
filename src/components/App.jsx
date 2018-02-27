import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import Landing from './Landing';
import Lobby from './Lobby';
import Signup from './Signup';
import PageNotFound from './PageNotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="app">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/lobby" component={Lobby} />
              <Route path="/signup" component={Signup} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
