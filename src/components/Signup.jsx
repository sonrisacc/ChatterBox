import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUpUser } from '../utli/httpHelpers';
import { setLoginUserName, getApiDetails } from '../actions/actionCreators';

class Signup extends Component {
  state = {
    userNameInput: '',
    showFormValidation: false
  };

  toggleRenderFormValidation = () => {
    this.setState({ showFormValidation: !this.state.showFormValidation });
  };

  handleChange = event => {
    this.setState({ userNameInput: event.target.value });
  };

  handleSignUp = () => {
    signUpUser(this.state.userNameInput).then(data => {
      if (data !== null) {
        console.log('this is handle signUpUser', data);
        this.props.handleLoginUserNameChange(data.username);
        this.props.handleGetApiDetails();
        this.goToLobby();
      } else if (data === null) {
        console.log('user exists');
        this.toggleRenderFormValidation();
        setTimeout(this.toggleRenderFormValidation, 1000);
      }
    });
  };

  goToLobby = () => {
    this.props.history.push('/lobby');
  };

  renderUserExists = () => (
    <div className="form-validation"> User Exists! </div>
  );

  render() {
    return (
      <div className="landing signup">
        <h1 className="welcome">Hello {this.state.userNameInput}</h1>
        {!!this.state.showFormValidation && this.renderUserExists()}
        <div className="landing-wrapper">
          <input
            className="login-input"
            type="text"
            placeholder="Input username here"
            onChange={this.handleChange}
          />
          <button className="btn btn-submmit" onClick={this.handleSignUp}>
            {' '}
            SignUp
          </button>
        </div>
        <button className="btn ">
          <Link to="/"> Cancel </Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ loginUsername: state.loginUsername });
const mapDispatchToProps = dispatch => ({
  handleLoginUserNameChange(username) {
    dispatch(setLoginUserName(username));
  },
  handleGetApiDetails() {
    dispatch(getApiDetails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
