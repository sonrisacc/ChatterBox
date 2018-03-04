import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/store';

import Landing from './Landing';
import Lobby from './Lobby';
import Signup from './Signup';
import PageNotFound from './PageNotFound';
import Chathistory from './Chathistory';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <div className="wrapper">
    <Router>
      <Provider store={store}>
        <div className="for production">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/lobby" component={Lobby} />
            <PrivateRoute path="/history" component={Chathistory} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Provider>
    </Router>
  </div>
);

export default App;
// "react/prop-types": "on",
