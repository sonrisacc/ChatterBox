import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setLoginUserName, getApiDetails } from '../actions/actionCreators';
import { checkUserNameExistence } from '../utli/httpHelpers';
import { emitNewUser } from '../utli/socketHelpers';

class Landing extends Component {
  state = {
    userNameInput: '',
    redirectToReferrer: false
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
        this.props.handleGetApiDetails();
        this.setState({ redirectToReferrer: true });
        // setTimeout(this.goToLobby, 1000);
      } else if (data === null) {
        this.goToSignUp();
      }
    });
  };

  renderHistoryPath = from => (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
    </div>
  );

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
        {this.renderHistoryPath(from)}
        <h1 className="welcome">Hello {this.state.userNameInput}</h1>
        <div className="landing-wrapper">
          <input
            className="login-input"
            type="text"
            placeholder="Input username here"
            onChange={this.handleChange}
          />
          <button
            className="btn btn-submmit"
            onClick={this.handleCheckingUserName}
          >
            LogIn
          </button>
        </div>
        <button className="btn ">
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
  },
  handleGetApiDetails() {
    dispatch(getApiDetails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
