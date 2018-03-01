import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';

import MessageCard from './MessageCard';
import Header from './Header';
import Inputbox from './Inputbox';
import Footer from './Footer';
import {
  receiveNewUser,
  receiveOffLineUser,
  emitUserLeft
} from '../utli/socketHelpers';

class Lobby extends Component {
  state = {
    newUserExist: false,
    offLineUserExist: false,
    newUser: '',
    offLineUser: ''
  };
  componentDidMount() {
    this.props.handleGetApiDetails();
    receiveNewUser(this.handleNewUserAcativity);
    receiveOffLineUser(this.handleOffLineUserAcativity);
  }

  goToHistory = () => {
    this.props.history.push('/history');
  };

  resetUserOnlineDiv = () => {
    this.setState({ newUserExist: false });
  };
  resetUserOfflineDiv = () => {
    this.setState({ offLineUserExist: false });
  };

  handleLogOut = () => {
    emitUserLeft(this.props.loginUsername);
    this.props.history.push('/');
  };

  handleNewUserAcativity = data => {
    this.setState({ newUser: data.username });
    this.setState({ newUserExist: true });
    setTimeout(this.resetUserOnlineDiv, 500);
  };

  handleOffLineUserAcativity = data => {
    console.log('handleOffLineUserAcativity', data);

    this.setState({ offLineUser: data.username });
    this.setState({ offLineUserExist: true });
    setTimeout(this.resetUserOfflineDiv, 500);
  };

  handleNewUserOnline = () => <div>{this.state.newUser} just joined</div>;
  handleNewUserOffline = () => <div>{this.state.offLineUser} just left</div>;

  render() {
    return (
      <div className="container">
        <Header />
        <div className="lobby-wrapper">
          <div className="socket-info">
            <div>10 participants</div>
            {!!this.state.newUserExist && this.handleNewUserOnline()}
            {!!this.state.offLineUserExist && this.handleNewUserOffline()}
          </div>
          <div className="main">
            {this.props.apiData.map(curMsn => (
              <MessageCard key={curMsn._id} {...curMsn} />
            ))}
          </div>
          <Inputbox />
        </div>
        <Footer logout={this.handleLogOut} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  apiData: state.apiData,
  loginUsername: state.loginUsername
});
const mapDispatchToProps = dispatch => ({
  handleGetApiDetails() {
    dispatch(getApiDetails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
