import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  setLoginUserName,
  getApiDetails,
  getRoomApiDetails,
  updateLocalData
} from '../actions/actionCreators';
import { checkUserNameExistence } from '../utli/httpHelpers';
import { emitNewUser } from '../utli/socketHelpers';

class Landing extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    handleLoginUserNameChange: PropTypes.func.isRequired,
    handleDoEverything: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    handlePrivateDetails: PropTypes.func.isRequired
  };

  state = {
    userNameInput: '',
    redirectToReferrer: false,
    curRoom: 'Lobby'
  };

  goToSignUp = () => {
    this.props.history.push('/signup');
  };

  handleUserInputChange = event => {
    this.setState({ userNameInput: event.target.value });
  };

  handleCheckingUserName = () => {
    checkUserNameExistence(this.state.userNameInput).then(data => {
      if (data !== null) {
        // if sucessfully logged in
        const privateDetails = JSON.parse(
          window.localStorage.getItem('roomdetail')
        );
        this.props.handlePrivateDetails(privateDetails);
        this.props.handleLoginUserNameChange(data.username);
        this.props.handleDoEverything(this.state.curRoom).then(() => {
          emitNewUser(this.state.userNameInput);
          this.setState({ redirectToReferrer: true });
        });
      } else if (data === null) {
        // if failed logged in
        this.goToSignUp();
      }
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/lobby' }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from.pathname} />;
    }
    return (
      <div className="landing">
        <div className="landing_container">
          <h1 className="landing_title">Hello {this.state.userNameInput}</h1>
          <div className="landing_inputbox">
            <input
              className="landing_inputbox_input"
              type="text"
              placeholder="Input username here"
              onChange={this.handleUserInputChange}
            />
            <button
              className="landing_inputbox_btn"
              onClick={this.handleCheckingUserName}
            >
              LogIn
            </button>
          </div>
          <button className="landing_footer">
            <Link to="/signUp"> SignUp </Link>
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
  },
  handlePrivateDetails(data) {
    dispatch(updateLocalData(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
