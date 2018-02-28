import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';
import socket from '../socketConnection';
import MessageCard from './MessageCard';

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
        <h1>This is lobby</h1>
        <div>Hello! {this.props.loginUsername}</div>
        <div className="box">
          <div className="main">
            {this.props.apiData.map(curMsn => (
              <MessageCard key={curMsn.id} {...curMsn} />
            ))}
          </div>
          <div className="dropdown">option</div>
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
          <button className="history" onClick={this.goToHistory}>
            All chat history
          </button>
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
