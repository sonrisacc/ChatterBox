import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { emitAddRoom } from '../utli/socketHelpers';

class RoomModal extends Component {
  state = {
    isPrivate: true,
    showDropdown: false,
    curRoomUserList: {},
    showSelected: false
  };
  setModalInputRef = node => {
    this.modalInput = node;
  };
  setModalPasswordRef = node => {
    this.modalPassword = node;
  };
  setModalRoomateRef = node => {
    this.modalRoomate = node;
  };
  setModalPrivacyRef = node => {
    this.modalPrivacy = node;
  };

  handleShowDropdown = () => {
    this.setState({ showDropdown: true });
  };

  handleAddInModal = () => {
    // need validation
    if (this.modalInput.value.replace(/\s/g, '').length > 0) {
      const roomName = this.modalInput.value;
      const isPrivate = this.modalPrivacy.value;
      const password = this.modalPassword.value;
      emitAddRoom(roomName, isPrivate, password);
      this.props.handleCloseAddRoomModal();
    }
  };

  handleCloseDropdown = e => {
    const { curRoomUserList } = this.state;
    const { userList } = this.props;
    const selectedUser = e.target.textContent;
    const newRoomate = {};
    newRoomate[selectedUser] = userList[selectedUser];
    const updatedList = Object.assign({}, newRoomate, curRoomUserList);

    this.setState({ curRoomUserList: updatedList });
    this.setState({ showDropdown: false });
  };

  handleRemoveRoomate = e => {
    const { curRoomUserList } = this.state;
    const cur = e.target.value;
    console.log('handleRemoveRoomate', cur);
    delete curRoomUserList[cur];
    this.setState({ curRoomUserList });
  };

  handelToggelPrivacy = () => {
    this.setState({ isPrivate: !this.state.isPrivate });
    if (this.state.isPrivate === true) {
      this.modalPassword.placeholder = 'type...';
      this.modalRoomate.placeholder = 'type...';
      this.modalPassword.value = '';
      this.modalRoomate.value = '';
      this.modalPrivacy.value = 'on';
      this.modalPassword.disabled = false;
      this.modalRoomate.disabled = false;
    } else if (this.state.isPrivate === false) {
      this.modalPrivacy.value = 'off';
      this.modalPassword.disabled = true;
      this.modalRoomate.disabled = true;
      this.modalPassword.value = '';
      this.modalPassword.placeholder = 'select private to enable';
      this.modalRoomate.placeholder = 'select private to enable';
    }
  };

  handleAutoCompletion = () => {
    this.renderUserList();
    if (this.state.curRoomUserList) this.setState({ showSelected: true });
    this.setState({ showDropdown: true });
  };

  renderSelectedUser = () =>
    Object.keys(this.state.curRoomUserList).map(cur => (
      <button
        key={this.state.curRoomUserList[cur]}
        onClick={this.handleRemoveRoomate}
        value={cur}
        className="info"
      >
        <b>-</b>
        {cur}
      </button>
    ));

  renderUserList = () =>
    Object.keys(this.props.userList)
      .filter(
        cur =>
          this.modalRoomate.value && cur.indexOf(this.modalRoomate.value) === 0
      )
      .map(cur => (
        <div
          role="presentation"
          key={this.props.userList[cur]}
          value={cur}
          className="input-dropdown_content_row"
          onClick={this.handleCloseDropdown}
          // onKeyUp={this.handleCloseDropdown}
        >
          {cur}
        </div>
      ));

  render() {
    return (
      <div className="modal ">
        <div className="modal_content">
          <div className="modal_content_header">
            <button
              className="close"
              onClick={this.props.handleCloseAddRoomModal}
            >
              &times;
            </button>
          </div>
          <div className="modal_content_body">
            <h1>Add a new room</h1>
            <div id="options" className="modal_content_body_row">
              <p>Is Private:</p>
              <input
                onChange={this.handelToggelPrivacy}
                ref={this.setModalPrivacyRef}
                type="checkbox"
                id="a"
              />
            </div>
            <div className="modal_content_body_row">
              <p>Add a room:</p>
              <input id="b" ref={this.setModalInputRef} placeholder="type..." />
            </div>
            <div className="modal_content_body_row">
              <p>Password:</p>
              <input
                id="c"
                ref={this.setModalPasswordRef}
                placeholder="select private to enable"
                disabled="disabled"
              />
            </div>
            <div className="modal_content_body_row">
              <p>Find roomates</p>
              <div className="input-dropdown">
                <input
                  id="findRoomate"
                  ref={this.setModalRoomateRef}
                  placeholder="select private to enable"
                  disabled="disabled"
                  onKeyUp={this.handleAutoCompletion}
                />
                {this.state.showDropdown && (
                  <div className="input-dropdown_content">
                    {this.renderUserList()}
                  </div>
                )}
              </div>
            </div>
            <div className="modal_content_body_row-info">
              {this.state.showSelected && this.renderSelectedUser()}
            </div>
          </div>
          <div className="modal_content_footer">
            <button onClick={this.handleAddInModal}>add</button>
          </div>
        </div>
      </div>
    );
  }
}

RoomModal.propTypes = {
  handleCloseAddRoomModal: PropTypes.func.isRequired,
  userList: PropTypes.object.isRequired // eslint-disable-line
  // filteredUser: PropTypes.array.isRequired, // eslint-disable-line
  // showDropdown: PropTypes.bool.isRequired,
  // selectedUser: PropTypes.array.isRequired // eslint-disable-line
  // addedUser: PropTypes.array.isRequired // eslint-disable-line
};

export default RoomModal;
