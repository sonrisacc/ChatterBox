import React, { Component } from 'react';
// import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoginUserName } from '../actions/actionCreators';

class Landing extends Component {
  state = {
    userNameInput: ''
  };

  handleChange = event => {
    this.setState({ userNameInput: event.target.value });
  };

  goToLobby = () => {
    this.props.history.push('/lobby');
  };

  render() {
    return (
      <div className="landing">
        <h1>Hello {this.props.loginUsername}</h1>

        <input
          type="text"
          placeholder="Input username here"
          onChange={this.handleChange}
        />
        <button
          onClick={() => {
            this.props.handleLoginUserNameChange(this.state.userNameInput);
            this.goToLobby();
          }}
        >
          LogIn
        </button>
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
