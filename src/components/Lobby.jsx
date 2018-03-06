import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  setLoginUserName,
  getApiDetails,
  getRoomApiDetails
} from '../actions/actionCreators';

import Header from './Header';
import Footer from './Footer';

import Privatechat from './Privatechat';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

import {
  updateOnlineUserList,
  emitUserLeft,
  switchRoom,
  receiveOneNewRoom,
  emitAddRoom
} from '../utli/socketHelpers';

const DEFAULT_SELECT_VALUE = 'Lobby';
class Lobby extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    handleLoginUserNameChange: PropTypes.func.isRequired,
    handleGetApiDetails: PropTypes.func.isRequired,
    handleGetRoomDetails: PropTypes.func.isRequired,
    loginUsername: PropTypes.string.isRequired
  };

  state = {
    selectValue: DEFAULT_SELECT_VALUE,
    isChating: false,
    userList: {},
    showModal: false
    // hasNewitem: false
  };

  componentDidMount() {
    updateOnlineUserList(this.handleUpdateOnlineUserList);
    receiveOneNewRoom(this.handleUpdateRoomList);
  }

  setNewRoomRef = node => {
    this.newRoomRef = node;
  };
  setModalInputRef = node => {
    this.modalInput = node;
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  handleAddInModal = () => {
    // need validation
    if (!this.modalInput.value.replace(/\s/g, '').length) {
      const roomName = this.modalInput.value;
      emitAddRoom(roomName);
    }
  };

  handleOpenAddRoomModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleRoomSlection = e => {
    const roomName = e.target.value;
    if (roomName !== 'More') {
      this.setState({ selectValue: roomName });
      this.props.handleGetApiDetails(roomName);
      switchRoom(roomName);
    } else {
      this.handleOpenAddRoomModal();
    }
  };

  handleLogOut = () => {
    emitUserLeft(this.props.loginUsername);
    this.props.handleLoginUserNameChange(null);
  };

  handleUpdateRoomList = data => {
    console.log('handleUpdateRoomList', data);
    this.props.handleGetRoomDetails();
  };

  handleUpdateOnlineUserList = data => {
    this.setState({ userList: data });
  };

  handleToggleUserPrivateChat = () => {
    console.log('handleUserPrivateChat clicked');
    this.setState({ isChating: !this.state.isChating });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  renderModal = () => (
    <div className="modal" id="addRomm">
      <div className="modal_content">
        <button className="close" onClick={this.handleCloseModal}>
          &times;
        </button>
        <p>Add a room</p>
        <input id="b" ref={this.setModalInputRef} placeholder="add" />
        <p>Is Private</p>
        <input className="option" type="checkbox" id=":13m" />
      </div>
      <div className="modal_footer">
        <button onClick={this.handleCloseModal}>cancel</button>
        <button onClick={this.handleAddInModal}>add</button>
      </div>
    </div>
  );

  renderHeader = () => (
    <Header
      optionsState={this.state.selectValue}
      change={this.handleRoomSlection}
      setRef={this.setNewRoomRef}
    />
  );

  render() {
    const { userList, isChating, selectValue, showModal } = this.state;

    return (
      <div className="chatterbox">
        <div className="chatterbox_header">
          {!isChating && this.renderHeader()}
        </div>
        <div className="chatterbox_container">
          <div className="chatterbox_container_leftpanel">
            <LeftPanel
              userList={userList}
              isChatting={this.handleToggleUserPrivateChat}
            />
          </div>
          <div className="chatterbox_container_midpanel">
            <div className="private-chat">{!!isChating && <Privatechat />}</div>
          </div>
          <div className="chatterbox_container_rightpanel">
            <RightPanel selectValue={selectValue} />
          </div>
        </div>
        <div className="chatterbox_footer">
          <Footer logout={this.handleLogOut} />
        </div>
        <div className="chatterbox_modal" />
        {!showModal && this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUsername: state.loginUsername
});

const mapDispatchToProps = dispatch => ({
  handleLoginUserNameChange(username) {
    dispatch(setLoginUserName(username));
  },
  handleGetApiDetails(room) {
    dispatch(getApiDetails(room));
  },
  handleGetRoomDetails() {
    dispatch(getRoomApiDetails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
