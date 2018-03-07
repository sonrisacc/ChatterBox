import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getRoomApiDetails } from '../actions/actionCreators';
// import { Link } from 'react-router-dom';

import DropDown from './Dropdown';

const Header = props => (
  <div className="header">
    <h1 className="header_title">This is {props.optionsState}</h1>
    <div className="header_sub">
      <div>Hello! {props.loginUsername}</div>
      <DropDown
        optionsState={props.optionsState}
        setRef={props.setRef}
        change={props.change}
      />
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
