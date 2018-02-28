import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = props => (
  <div className="header">
    <h1>This is lobby</h1>
    <div className="sub-header">
      <div>Hello! {props.loginUsername}</div>
      <button className="historyBtn">
        <Link to="/history">All chat history</Link>
      </button>
    </div>
  </div>
);

const mapStateToProps = state => ({
  loginUsername: state.loginUsername
});

export default connect(mapStateToProps)(Header);
