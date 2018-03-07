import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { signUpUser } from '../utli/httpHelpers';
import {
  setLoginUserName,
  getApiDetails,
  getRoomApiDetails
} from '../actions/actionCreators';
import { emitNewUser } from '../utli/socketHelpers';

// const DEFAULT_SELECT_VALUE = 'Lobby';
class Signup extends Component {
  static propTypes = {
    handleLoginUserNameChange: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    // handleGetApiDetails: PropTypes.func.isRequired,
    handleDoEverything: PropTypes.func.isRequired
  };

  state = {
    userNameInput: '',
    showFormValidation: false,
    curRoom: 'Lobby'
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
        this.props.handleDoEverything(this.state.curRoom).then(() => {
          // need to find a better way
          setTimeout(() => {
            this.goToLobby();
            emitNewUser(this.state.userNameInput);
          }, 500);
        });
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
    <div className="landing_validation-error"> User Exists! </div>
  );

  render() {
    return (
      <div className="landing">
        <div className="landing_container">
          <h1 className="landing_title">Welcome! {this.state.userNameInput}</h1>
          {!!this.state.showFormValidation && this.renderUserExists()}
          <div className="landing_inputbox">
            <input
              className="landing_inputbox_input"
              type="text"
              placeholder="Input username here"
              onChange={this.handleChange}
            />
            <button
              className="landing_inputbox_btn"
              onClick={this.handleSignUp}
            >
              SignUp
            </button>
          </div>
          <button className="landing_footer">
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
  handleDoEverything(room) {
    return Promise.all([
      dispatch(getApiDetails(room)),
      dispatch(getRoomApiDetails())
    ]);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
