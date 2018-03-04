import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { signUpUser } from '../utli/httpHelpers';
import { setLoginUserName, getApiDetails } from '../actions/actionCreators';
import { emitNewUser } from '../utli/socketHelpers';

const DEFAULT_SELECT_VALUE = 'Lobby';
class Signup extends Component {
  static propTypes = {
    handleLoginUserNameChange: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    handleGetApiDetails: PropTypes.func.isRequired
  };

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
        this.props.handleLoginUserNameChange(data.username);
        this.props.handleGetApiDetails(DEFAULT_SELECT_VALUE);
        emitNewUser(this.state.userNameInput);
        this.goToLobby();
      } else if (data === null) {
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
        <div className="f">
          <h1 className="welcome">Welcome! {this.state.userNameInput}</h1>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({ loginUsername: state.loginUsername });
const mapDispatchToProps = dispatch => ({
  handleLoginUserNameChange(username) {
    dispatch(setLoginUserName(username));
  },
  handleGetApiDetails(room) {
    dispatch(getApiDetails(room));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
