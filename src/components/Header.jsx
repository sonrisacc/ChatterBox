import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getRoomApiDetails } from '../actions/actionCreators';
// import { Link } from 'react-router-dom';

const Header = props => (
  <div className="header">
    <h1 className="header_title">This is {props.optionsState}</h1>
    <div className="header_sub">
      <div>Hello! {props.loginUsername}</div>
      <div className="header_dropdown">
        <select
          ref={props.setRef}
          value={props.optionsState}
          onChange={props.change}
        >
          <option value="" disabled="disabled">
            Choose a room
          </option>
          <option value="Lobby">Lobby</option>
          <option value="Beach">Beach</option>
          <option value="Sandstorm">Sandstorm</option>
          {/* <option value="More">Add new room</option> */}
        </select>
      </div>
      {/* <button className="historyBtn">
        <Link to="/history">All chat history</Link>
      </button> */}
    </div>
  </div>
);

Header.propTypes = {
  optionsState: PropTypes.string.isRequired,
  loginUsername: PropTypes.string.isRequired,
  setRef: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loginUsername: state.loginUsername,
  roomData: state.roomData
});

export default connect(mapStateToProps)(Header);
