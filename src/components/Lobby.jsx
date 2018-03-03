import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginUserName, getApiDetails } from '../actions/actionCreators';

import MessageCard from './MessageCard';
import Header from './Header';
import Inputbox from './Inputbox';
import Footer from './Footer';
import GeneralInfo from './GeneralInfo';
import Loading from './Loading';
import {
  emitUserLeft,
  receiveNewMessage,
  receiveOneUserTyping,
  oneUserStoppedTyping,
  switchRoom
} from '../utli/socketHelpers';

const DEFAULT_SELECT_VALUE = 'Lobby';
class Lobby extends Component {
  state = {
    isTyping: false,
    oneUser: 'One user',
    selectValue: DEFAULT_SELECT_VALUE
    // hasNewitem: false
  };

  componentDidMount() {
    this.scrollToBottom();
    receiveNewMessage(() =>
      this.props.handleGetApiDetails(this.state.selectValue)
    );
    receiveOneUserTyping(this.handleToggleIsTypingComponent);
    oneUserStoppedTyping(this.handleToggleStoppedTypingComponent);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  setGhostDiv = node => {
    this.ghostDiv = node;
  };
  setNewRoomRef = node => {
    this.newRoomRef = node;
  };
  scrollToBottom = () => {
    this.ghostDiv.scrollIntoView({ behavior: 'smooth' });
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  addRoom = () => {
    // open modal,
    // get room name
    // update renderNewRoomOption
    // update state
  };

  handleAddRoom = () => {
    this.addRoom('test');
    this.toggleHasNewitem();
    setTimeout(this.toggleHasNewitem, 300);
  };

  handleRoomSlection = e => {
    const roomName = e.target.value;
    if (roomName !== 'More') {
      this.setState({ selectValue: roomName });
      this.props.handleGetApiDetails(roomName);
      switchRoom(roomName);
    } else {
      this.handleAddRoom();
    }
  };

  handleLogOut = () => {
    emitUserLeft(this.props.loginUsername);
    this.props.handleLoginUserNameChange(null);
    // this.props.history.push('/');
  };

  handleToggleIsTypingComponent = data => {
    this.setState({ oneUser: data, isTyping: true });
  };
  handleToggleStoppedTypingComponent = data => {
    this.setState({ oneUser: data, isTyping: false });
  };

  renderUserIsTyping = () => (
    <div className="msnCard" id="typing">
      {this.state.oneUser} is typing:
      <Loading />
    </div>
  );

  render() {
    return (
      <div className="container">
        <Header
          optionsState={this.state.selectValue}
          change={this.handleRoomSlection}
        />
        <div className="lobby-wrapper">
          <GeneralInfo />
          <div className="main">
            {this.props.apiData.map(curMsn => (
              <MessageCard
                cur={this.props.loginUsername}
                key={curMsn._id}
                {...curMsn}
              />
            ))}
            {this.state.isTyping && this.renderUserIsTyping()}
            <div id="ghost-div" className="msnCard" ref={this.setGhostDiv} />
          </div>
          <Inputbox room={this.state.selectValue} />
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
  handleLoginUserNameChange(username) {
    dispatch(setLoginUserName(username));
  },
  handleGetApiDetails(room) {
    dispatch(getApiDetails(room));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
