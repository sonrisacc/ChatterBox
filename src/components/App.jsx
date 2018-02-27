import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import Landing from './Landing';
import Lobby from './Lobby';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import Chathistory from './Chathistory';

class App extends Component {
  // state = {
  //   chatHistory: []
  // };
  // componentDidMount() {
  //
  // }
  render() {
    // console.log(this.state.chatHistory);
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div className="app">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/signup" component={Signup} />
              <Route path="/lobby" component={Lobby} />
              <Route path="/history" component={Chathistory} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
