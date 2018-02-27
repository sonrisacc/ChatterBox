import React, { Component } from 'react';
// import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoginUserName } from '../actions/actionCreators';

class Landing extends Component {
  state = {
    userNameInput: ''
  };

  // handleSubmit = event => {
  //   console.log('searched', props.loginUsername);
  //   event.preventDefault();
  // };
  //
  handleChange = event => {
    this.setState({ userNameInput: event.target.value });
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
          onClick={() =>
            this.props.handleLoginUserNameChange(this.state.userNameInput)
          }
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
