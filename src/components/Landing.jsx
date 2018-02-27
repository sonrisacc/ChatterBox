// import React, { Component } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoginUserName } from '../actions/actionCreators';

const Landing = props => (
  // state = {
  //   userNameInput: ''
  // };

  // handleSubmit = event => {
  //   console.log('searched', props.loginUsername);
  //   event.preventDefault();
  // };
  //
  // handleChange = event => {
  //   this.setState({ userNameInput: event.target.value });
  // };

  <div className="landing">
    <h1>Hello {props.loginUsername}</h1>

    <input
      type="text"
      placeholder="Input username here"
      onChange={props.handleLoginUserNameChange}
    />
    {/* <button onClick={this.handleSubmit}>LogIn</button> */}
    <button>
      <Link to="/signUp"> SignUp </Link>
    </button>
  </div>
);

const mapStateToProps = state => ({ loginUsername: state.loginUsername });
const mapDispatchToProps = dispatch => ({
  handleLoginUserNameChange(event) {
    dispatch(setLoginUserName(event.target.value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
