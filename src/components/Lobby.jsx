import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';

import MessageCard from './MessageCard';
import Header from './Header';
import Inputbox from './Inputbox';
import Footer from './Footer';
import GeneralInfo from './GeneralInfo';
import Loading from './Loading';
import {
  emitUserLeft,
  receiveNewMessage,
  receiveOneUserTyping
} from '../utli/socketHelpers';

class Lobby extends Component {
  state = {
    isTyping: false,
    oneUser: 'One user'
  };
  componentDidMount() {
    this.scrollToBottom();
    receiveNewMessage(this.props.handleGetApiDetails);
    receiveOneUserTyping(this.handleToggleIsTypingComponent);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  setGhostDiv = node => {
    this.ghostDiv = node;
  };

  getUserIsTying = () => (
    <div className="msnCard">
      {this.state.oneUser} is typing:
      <Loading />
    </div>
  );

  scrollToBottom = () => {
    console.log('scrollToBottom running', this.ghostDiv);
    this.ghostDiv.scrollIntoView({ behavior: 'smooth' });
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  handleLogOut = () => {
    emitUserLeft(this.props.loginUsername);
    this.props.history.push('/');
  };

  handleToggleIsTypingComponent = data => {
    console.log('handleToggleIsTypingComponent', data);
    this.setState({ oneUser: data, isTyping: true });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <div className="lobby-wrapper">
          <GeneralInfo />
          <div className="main">
            {this.props.apiData.map(curMsn => (
              <MessageCard key={curMsn._id} {...curMsn} />
            ))}
            {this.state.isTyping && this.getUserIsTying()}
            <div id="ghost-div" className="msnCard" ref={this.setGhostDiv} />
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
