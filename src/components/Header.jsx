import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const Header = props => (
  <div className="header">
    <h1>This is {props.optionsState}</h1>
    <div className="sub-header">
      <div>Hello! {props.loginUsername}</div>
      <div className="dropdown-content room">
        <select
          ref={props.setRef}
          value={props.optionsState}
          onChange={props.change}
        >
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
  loginUsername: state.loginUsername
});

export default connect(mapStateToProps)(Header);
