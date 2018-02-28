import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUpUser } from '../utli/httpHelpers';
import { setLoginUserName } from '../actions/actionCreators';

class Signup extends Component {
  state = {
    userNameInput: ''
  };

  handleChange = event => {
    this.setState({ userNameInput: event.target.value });
  };

  handleSignUp = () => {
    signUpUser(this.state.userNameInput).then(data => {
      if (data !== null) {
        this.props.handleLoginUserNameChange(data);
        this.goToLobby();
      } else if (data === null) {
        console.log('user exists');
      }
    });
  };

  goToLobby = () => {
    this.props.history.push('/lobby');
  };

  render() {
    return (
      <div className="Signup">
        <h1>Hello {this.state.userNameInput}</h1>
        <input
          type="text"
          placeholder="Input username here"
          onChange={this.handleChange}
        />
        <button onClick={this.handleSignUp}> Take me to lobby</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
