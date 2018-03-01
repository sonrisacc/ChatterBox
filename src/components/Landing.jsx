import React, { Component } from 'react';
// import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoginUserName } from '../actions/actionCreators';
import { checkUserNameExistence } from '../utli/httpHelpers';
import { emitNewUser } from '../utli/socketHelpers';

class Landing extends Component {
  state = {
    userNameInput: ''
  };

  handleChange = event => {
    this.setState({ userNameInput: event.target.value });
  };

  goToLobby = () => {
    emitNewUser(this.state.userNameInput);
    this.props.history.push('/lobby');
  };

  goToSignUp = () => {
    this.props.history.push('/signup');
  };

  handleCheckingUserName = () => {
    checkUserNameExistence(this.state.userNameInput).then(data => {
      if (data !== null) {
        this.props.handleLoginUserNameChange(data.username);
        this.goToLobby();
      } else if (data === null) {
        this.goToSignUp();
      }
    });
  };

  render() {
    return (
      <div className="landing">
        <h1>Hello</h1>
        <input
          type="text"
          placeholder="Input username here"
          onChange={this.handleChange}
        />
        <button onClick={this.handleCheckingUserName}>LogIn</button>
        <button>
          <Link to="/signUp"> SignUp </Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loginUsername: state.loginUsername });
const mapDispatchToProps = dispatch => ({
  handleLoginUserNameChange(username) {
    dispatch(setLoginUserName(username));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
