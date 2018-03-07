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

import RoomModal from './RoomModal';
import EnterRoomModal from './EnterRoomModal';
import {
  updateOnlineUserList,
  emitUserLeft,
  switchRoom,
  receiveOneNewRoom,
  emitAddRoom
} from '../utli/socketHelpers';
import { pwdcheck } from '../utli/httpHelpers';

const DEFAULT_SELECT_VALUE = 'Lobby';
class Lobby extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history.isRequired,
    handleLoginUserNameChange: PropTypes.func.isRequired,
    handleGetApiDetails: PropTypes.func.isRequired,
    handleGetRoomDetails: PropTypes.func.isRequired,
    loginUsername: PropTypes.string.isRequired,
    roomData: PropTypes.object.isRequired // eslint-disable-line
  };

  state = {
    selectValue: DEFAULT_SELECT_VALUE,
    pwdCheckRoomVal: DEFAULT_SELECT_VALUE,
    isChating: false,
    userList: {},
    showAddRoomModal: false,
    showEnterRoomModal: false,
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
  setEnterRoomModalInputRef = node => {
    this.modalPwdInputRef = node;
  };

  goToHistory = () => {
    this.props.history.push('/history');
  };

  handleUpdateOnlineUserList = data => {
    this.setState({ userList: data });
  };
  handleOpenAddRoomModal = () => {
    this.setState({ showAddRoomModal: !this.state.showAddRoomModal });
  };
  handleCloseAddRoomModal = () => {
    this.setState({ showAddRoomModal: false, isPrivate: true });
  };
  handleToggleUserPrivateChat = () => {
    console.log('handleUserPrivateChat clicked');
    this.setState({ isChating: !this.state.isChating });
  };

  handleCloseEnterRoomModal = () => {
    this.setState({ showEnterRoomModal: false });
  };
  handleOpenEnterRoomModal = () => {
    this.setState({ showEnterRoomModal: !this.state.showEnterRoomModal });
  };

  handlePwdCheck = () => {
    const pwd = this.modalPwdInputRef.value;
    console.log('pwd input', pwd);
    pwdcheck(pwd, this.state.pwdCheckRoomVal).then(isCorrect => {
      if (isCorrect) {
        this.setState({ selectValue: this.state.pwdCheckRoomVal });
        this.props.handleGetApiDetails(this.state.pwdCheckRoomVal);
        switchRoom(this.state.pwdCheckRoomVal);
        this.handleCloseEnterRoomModal();
      } else {
        console.log('pwd is not correct');
      }
    });
  };

  handleLogOut = () => {
    emitUserLeft(this.props.loginUsername);
    this.props.handleLoginUserNameChange(null);
  };

  handleUpdateRoomList = () => {
    this.props.handleGetRoomDetails();
  };

  handleAddInModal = () => {
    // need validation
    if (this.modalInput.value.replace(/\s/g, '').length > 0) {
      const roomName = this.modalInput.value;
      const isPrivate = this.modalPrivacy.value;
      const password = this.modalPassword.value;
      emitAddRoom(roomName, isPrivate, password);
      this.handleCloseAddRoomModal();
    }
  };

  handelToggelPrivacy = () => {
    this.setState({ isPrivate: !this.state.isPrivate });
    if (this.state.isPrivate === true) {
      this.modalPassword.placeholder = 'type...';
      this.modalPassword.value = '';
      this.modalPrivacy.value = 'on';
      this.modalPassword.disabled = false;
    } else if (this.state.isPrivate === false) {
      this.modalPrivacy.value = 'off';
      this.modalPassword.disabled = true;
      this.modalPassword.value = '';
      this.modalPassword.placeholder = 'select private to enable';
    }
  };

  handleRoomSlection = e => {
    const roomName = e.target.value;

    if (roomName !== 'More') {
      const privacyCheck = this.props.roomData[roomName].isPrivate;
      if (privacyCheck !== true) {
        this.setState({ selectValue: roomName });
        this.props.handleGetApiDetails(roomName);
        switchRoom(roomName);
      } else {
        this.setState({ pwdCheckRoomVal: roomName });
        this.handleOpenEnterRoomModal();
      }
    } else {
      this.handleOpenAddRoomModal();
    }
  };

  renderEnterRoomModal = () => (
    <EnterRoomModal
      handleCloseModal={this.handleCloseEnterRoomModal}
      setModalInputRef={this.setEnterRoomModalInputRef}
      handlePwdCheck={this.handlePwdCheck}
      title={this.state.pwdCheckRoomVal}
    />
  );

  renderAddRoomModal = () => (
    <RoomModal
      handleCloseModal={this.handleCloseAddRoomModal}
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
    const {
      userList,
      isChating,
      selectValue,
      showAddRoomModal,
      showEnterRoomModal
    } = this.state;
    console.log('selectValue', selectValue);
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
          {!!showAddRoomModal && this.renderAddRoomModal()}
          {!!showEnterRoomModal && this.renderEnterRoomModal()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginUsername: state.loginUsername,
  roomData: state.apiRoomData
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
