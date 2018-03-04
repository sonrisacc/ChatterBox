import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Chathistory = props => (
  <div className="Chathistory">
    <h1> Chat History</h1>
    <p>{JSON.stringify(props.apiData)}</p>
    <button>
      <Link to="/lobby"> Back to lobby</Link>
    </button>
  </div>
);

Chathistory.propTypes = {
  apiData: PropTypes.arrayOf(PropTypes.object).isRequired
};
const mapStateToProps = state => ({ apiData: state.apiData });

export default connect(mapStateToProps)(Chathistory);
