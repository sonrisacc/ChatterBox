import React, { Component } from 'react';
import moment from 'moment';
import { emitDeleteMessage } from '../utli/socketHelpers';

class MessageCard extends Component {
  state = {
    isHovering: false,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  componentDidMount() {
    if (this.props.selfDestruct === true) this.handleCountDown();
  }
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

  handleCountDown = () => {
    const interval = 1000;
    const eventTime = moment(this.props.destructAt, 'YYYY-MM-DD hh:mm:ss');
    const now = moment();
    let duration = eventTime.diff(now);
    const init = moment.duration(duration, 'milliseconds');
    this.setState({
      hours: init.hours(),
      minutes: init.minutes(),
      seconds: init.seconds()
    });
    const id = setInterval(() => {
      duration = moment.duration(duration - interval, 'milliseconds');
      if (duration.milliseconds() <= 0) {
        clearTimeout(id);
        this.handleDelete();
      }
      this.setState({
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds()
      });
    }, interval);
  };

  renderDeletCard = () => (
    <button id="msnCard-delete" onClick={this.handleDelete}>
      delete
    </button>
  );
  renderDestructCard = () => (
    <div id="msnCard-self-delete">
      {`count down timer: ${this.state.hours}:${this.state.minutes}:${
        this.state.seconds
      }`}
    </div>
  );

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
