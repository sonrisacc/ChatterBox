import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';
import socket from '../socketConnection';
import MessageCard from './MessageCard';
import Header from './Header';

class Lobby extends Component {
  componentDidMount() {
    this.props.handleGetApiDetails();
  }

  goToHistory = () => {
    this.props.history.push('/history');
  };
  render() {
    // socket.on('time', timeString => {
    //   console.log(`Server time: ${timeString}`);
    // });
    socket.on('news', data => {
      console.log(data);
      socket.emit('myTestEvent', { my: 'data' });
    });
    return (
      <div className="container">
        <Header />
        <div className="box">
          <div className="main">
            {this.props.apiData.map(curMsn => (
              <MessageCard key={curMsn._id} {...curMsn} />
            ))}
          </div>
          <div className="input-box">
            <div className="dropdown">
              <div className="dropdown-content">
                <ul>30s</ul>
                <ul>1 min</ul>
                <ul>2 min</ul>
                <ul>5 min</ul>
                <ul>1 hr</ul>
              </div>
              <button className="dropbtn">Dropdown</button>
            </div>
            <div
              className="input-area"
              contentEditable="true"
              aria-multiline="true"
              role="textbox"
              aria-label="Note"
              spellCheck="true"
            >
              Start typing here..
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  apiData: state.apiData,
  loginUsername: state.loginUsername
});
const mapDispatchToProps = dispatch => ({
  handleGetApiDetails() {
    dispatch(getApiDetails());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
