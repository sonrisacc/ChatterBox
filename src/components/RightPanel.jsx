import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoginUserName, getApiDetails } from '../actions/actionCreators';
import {
  receiveNewMessage,
  receiveOneUserTyping,
  oneUserStoppedTyping
} from '../utli/socketHelpers';

import MessageCard from './rightPanel/MessageCard';
import Inputbox from './rightPanel/Inputbox';
import Loading from './rightPanel/Loading';

class RightPanel extends Component {
  static propTypes = {
    handleLoginUserNameChange: PropTypes.func.isRequired,
    handleGetApiDetails: PropTypes.func.isRequired,
    loginUsername: PropTypes.string.isRequired,
    apiData: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectValue: PropTypes.string.isRequired
  };
  state = {
    isTyping: false,
    oneUser: 'One user'
  };

  componentDidMount() {
    this.scrollToBottom();
    receiveNewMessage(() =>
      this.props.handleGetApiDetails(this.props.selectValue)
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

  scrollToBottom = () => {
    this.ghostDiv.scrollIntoView({ behavior: 'smooth' });
  };

  handleToggleIsTypingComponent = data => {
    this.setState({ oneUser: data, isTyping: true });
  };
  handleToggleStoppedTypingComponent = data => {
    this.setState({ oneUser: data, isTyping: false });
  };

  renderMessageCard = () =>
    this.props.apiData.map(curMsn => (
      <MessageCard
        cur={this.props.loginUsername}
        key={curMsn._id}
        {...curMsn}
      />
    ));

  renderUserIsTyping = () => (
    <div id="typing">
      {this.state.oneUser} is typing:
      <Loading />
    </div>
  );
  render() {
    return (
      <div className="msgbox">
        <div className="msgbox_body">
          <div className="msgbox_body_maincards">
            {this.renderMessageCard()}
            {!!this.state.isTyping && this.renderUserIsTyping()}
            <div id="ghost-div" ref={this.setGhostDiv} />
          </div>
        </div>
        <div className="msgbox_footer">
          <Inputbox room={this.props.selectValue} />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
