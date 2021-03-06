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
    roomData: PropTypes.object.isRequired // eslint-disable-line
  };

  componentDidMount() {
    this.renderRoomOption();
  }

  renderRoomOption = () => {
    const data = Object.values(this.props.roomData);
    const result = data.map(({ roomname, _id, isPrivate }) => (
      <option key={_id} value={roomname}>
        {isPrivate && `&#xf023; ${roomname}`}
        {!isPrivate && roomname}
      </option>
    ));
    return result;
  };

  renderDefault = () => <option value="Lobby">Lobby</option>;

  render() {
    console.log('this.props.optionsState Dropdown', this.props.optionsState);
    return (
      <div className="header_dropdown">
        <select
          ref={this.props.setRef}
          onChange={this.props.change}
          value={this.props.optionsState}
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
