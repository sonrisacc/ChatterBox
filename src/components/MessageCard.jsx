import React, { Component } from 'react';
import moment from 'moment';
import { emitDeleteMessage } from '../utli/socketHelpers';

class MessageCard extends Component {
  state = {
    isHovering: false
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };
  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  handleDelete = () => {
    emitDeleteMessage(this.props._id);
    this.handleMouseLeave();
  };

  handleTimeFormat = () => {
    const curTime = this.props.createdAt;
    const disPlayTime = moment(curTime).fromNow();
    return disPlayTime;
  };

  renderDeletCard = () => (
    <button id="msnCard-delete" onClick={this.handleDelete}>
      delete
    </button>
  );
  renderDestructCard = () => <div>{this.props.destructAt}</div>;

  render() {
    return (
      <div
        className="msnCard"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="msnCard-header">
          <div id="msnCard-author">{`${this.props.author}: `}</div>
          <div id="msnCard-time">{this.handleTimeFormat()}</div>
          {!!this.props.selfDestruct && this.renderDestructCard()}
          {!!this.state.isHovering && this.renderDeletCard()}
        </div>
        <div id="msnCard-body">{this.props.message}</div>
      </div>
    );
  }
}

export default MessageCard;
