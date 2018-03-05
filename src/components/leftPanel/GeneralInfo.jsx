import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  receiveNewUser,
  receiveOffLineUser,
  receiveOnlineUserNumber
} from '../../utli/socketHelpers';

const ONLINE_USER_NUM = 1;

class GeneralInfo extends Component {
  state = {
    newUserExist: false,
    offLineUserExist: false,
    newUser: '',
    offLineUser: '',
    userNumber: ONLINE_USER_NUM
  };

  componentDidMount() {
    receiveNewUser(this.handleNewUserAcativity);
    receiveOffLineUser(this.handleOffLineUserAcativity);
    receiveOnlineUserNumber(this.handleOnlineUserNumber);
  }

  resetUserOnlineDiv = () => {
    this.setState({ newUserExist: false });
  };
  resetUserOfflineDiv = () => {
    this.setState({ offLineUserExist: false });
  };

  handleOnlineUserNumber = data => {
    this.setState({ userNumber: data });
  };

  handleNewUserAcativity = data => {
    this.setState({
      newUser: data.username,
      newUserExist: true
    });
    this.handleOnlineUserNumber();
    setTimeout(this.resetUserOnlineDiv, 2000);
  };

  handleOffLineUserAcativity = data => {
    this.setState({
      offLineUser: data.username,
      offLineUserExist: true
    });
    this.handleOnlineUserNumber();
    setTimeout(this.resetUserOfflineDiv, 2000);
  };

  handleNewUserOnline = () => <div>{this.state.newUser} just joined</div>;
  handleNewUserOffline = () => <div>{this.state.offLineUser} just left</div>;

  render() {
    return (
      <div className="userlist_header_info">
        <div>{this.state.userNumber || ONLINE_USER_NUM} participants</div>
        {!!this.state.newUserExist && this.handleNewUserOnline()}
        {!!this.state.offLineUserExist && this.handleNewUserOffline()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUsername: state.loginUsername
});

export default connect(mapStateToProps)(GeneralInfo);
