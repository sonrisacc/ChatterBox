import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';
import socket from '../socketConnection';

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
      <div className="lobby">
        <h1>This is lobby</h1>
        <p className="test">Hello! {this.props.loginUsername}</p>
        <button onClick={this.goToHistory}>All chat history</button>
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
