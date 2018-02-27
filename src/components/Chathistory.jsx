import React from 'react';
import { connect } from 'react-redux';

const Chathistory = props => (
  <div className="Chathistory">
    <h1> Chathistory</h1>
    <p>{JSON.stringify(props.apiData)}</p>
  </div>
);

const mapStateToProps = state => ({ apiData: state.apiData });

export default connect(mapStateToProps)(Chathistory);
