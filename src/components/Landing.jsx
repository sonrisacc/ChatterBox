import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="landing">
    <h1>Hello</h1>
    <Link to="/lobby">Please tell me your name </Link>
  </div>
);

// const mapStateToProps = state => ({ setLoginUserName: state.userName });
export default Landing;
