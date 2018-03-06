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
import RoomModal from './RoomModal';
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
    showModal: false,
    isPrivate: true
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
  setModalPasswordRef = node => {
    this.modalPassword = node;
  };

  setModalPrivacyRef = node => {
    this.modalPrivacy = node;
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  handelToggelPrivacy = () => {
    this.setState({ isPrivate: !this.state.isPrivate });
    if (this.state.isPrivate === true) {
      this.modalPassword.placeholder = 'type...';
      this.modalPassword.value = '';
      this.modalPrivacy.value = 'on';
      this.modalPassword.disabled = true;
    } else if (this.state.isPrivate === false) {
      this.modalPrivacy.value = 'off';
      this.modalPassword.disabled = false;
      this.modalPassword.value = '';
      this.modalPassword.placeholder = 'select private to enable';
    }
  };

  handleAddInModal = () => {
    // need validation
    if (this.modalInput.value.replace(/\s/g, '').length > 0) {
      const roomName = this.modalInput.value;
      emitAddRoom(roomName);
      this.handleCloseModal();
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
    <RoomModal
      handleCloseModal={this.handleCloseModal}
      setModalInputRef={this.setModalInputRef}
      setModalPasswordRef={this.setModalPasswordRef}
      handleAddInModal={this.handleAddInModal}
      setModalPrivacyRef={this.setModalPrivacyRef}
      handelToggelPrivacy={this.handelToggelPrivacy}
    />
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
        <div className="chatterbox_modal">
          {!!showModal && this.renderModal()}
        </div>
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
