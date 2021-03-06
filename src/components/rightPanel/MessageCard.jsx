import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { emitDeleteMessage } from '../../utli/socketHelpers';

class MessageCard extends Component {
  static propTypes = {
    selfDestruct: PropTypes.bool.isRequired,
    cur: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    destructAt: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  };

  state = {
    isHovering: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    mayEdit: false
  };

  componentDidMount() {
    if (this.props.selfDestruct === true) this.handleCountDown();
  }
  handleMouseEnter = () => {
    if (this.props.cur === this.props.author) {
      this.setState({ mayEdit: true, isHovering: true });
      this.setState({ isHovering: true });
    }
  };
  handleMouseLeave = () => {
    if (this.props.cur === this.props.author) {
      this.setState({ mayEdit: true, isHovering: false });
    }
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
    <button className="msnCard_header_hidden" onClick={this.handleDelete}>
      delete
    </button>
  );
  renderDestructCard = () => (
    <div className="msnCard_header_hidden" id="msnCard-self-delete">
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
        <div className="msnCard_header">
          <div className="msnCard_header_primary" id="msnCard-author">{`${
            this.props.author
          }: `}</div>
          <div className="msnCard_header_secondary" id="msnCard-time">
            {this.handleTimeFormat()}
          </div>
          {!!this.props.selfDestruct && this.renderDestructCard()}
          {!!this.state.mayEdit &&
            !!this.state.isHovering &&
            this.renderDeletCard()}
        </div>
        <div className="msnCard_body">{this.props.message}</div>
      </div>
    );
  }
}

export default MessageCard;
