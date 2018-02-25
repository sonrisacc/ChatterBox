// entry point for hot module reload

import React from 'react';
import { render } from 'react-dom';
import App from './App';

console.log('running');
const renderApp = () => {
  render(<App />, document.getElementById('app'));
};
// render App for the same time
renderApp();

// if hot module is enabled for this build, in dev mode, then if app changed, rerender the whole app
// everything else, babel config already provided joints, only the top level component need this
// module varibale come from webpack
if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}
