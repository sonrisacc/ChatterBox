import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, loginUsername, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // console.log('PrivateRoute', { ...rest });
      loginUsername ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  loginUsername: PropTypes.string,
  location: ReactRouterPropTypes.location.isRequired, // eslint-disable-line
  component: PropTypes.func.isRequired
};

PrivateRoute.defaultProps = {
  loginUsername: 'Visitor'
};

const mapStateToProps = state => ({
  loginUsername: state.loginUsername
});

export default connect(mapStateToProps)(PrivateRoute);
