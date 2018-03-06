import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { getRoomApiDetails } from '../actions/actionCreators';

class Dropdown extends Component {
  static propTypes = {
    // handleGetRoomDetails: PropTypes.func.isRequired,
    optionsState: PropTypes.string.isRequired,
    setRef: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    roomData: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  renderRoomOption = () =>
    this.props.roomData.map(({ roomname, _id }) => (
      <option key={_id} value={roomname}>
        {roomname}
      </option>
    ));

  render() {
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
          {this.renderRoomOption()}
          <option value="More">Add new room</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({ roomData: state.apiRoomData });
const mapDispatchToProps = dispatch => ({
  handleGetRoomDetails() {
    dispatch(getRoomApiDetails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
