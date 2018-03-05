import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Dropdown extends Component {
  static propTypes = {
    optionsState: PropTypes.string.isRequired,
    setRef: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    roomData: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  renderRoomOption = () => {
    console.log(' this.props.roomData', this.props.roomData);
    return this.props.roomData.map(({ roomname }) => (
      <option value={roomname}>{roomname}</option>
    ));
  };

  render() {
    // const { roomData } = this.props;

    return (
      <div className="header_dropdown">
        <select
          ref={this.props.setRef}
          value={this.props.optionsState}
          onChange={this.props.change}
        >
          <option value="" disabled="disabled">
            Choose a room
          </option>
          {/* {this.renderRoomOption()} */}
          <option value="Lobby">Lobby</option>
          <option value="Beach">Beach</option>
          <option value="Sandstorm">Sandstorm</option>
          {/* <option value="More">Add new room</option> */}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({ roomData: state.roomData });

export default connect(mapStateToProps)(Dropdown);
