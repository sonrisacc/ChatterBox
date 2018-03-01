import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';
import socket from '../socketConnection';
import MessageCard from './MessageCard';
import Header from './Header';
import Inputbox from './Inputbox';
import Footer from './Footer';

class Lobby extends Component {
  componentDidMount() {
    this.props.handleGetApiDetails();
  }

  goToHistory = () => {
    this.props.history.push('/history');
  };

  handleLogOut = () => {
    console.log('clicked');
    this.props.history.push('/');
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
        <div className="lobby-wrapper">
          <div className="socket-info">
            <div>Someone just joined</div>
            <div>10 participants</div>
            <div>Someone just left</div>
          </div>
          <div className="main">
            {this.props.apiData.map(curMsn => (
              <MessageCard key={curMsn._id} {...curMsn} />
            ))}
          </div>
          <Inputbox />
        </div>
        <Footer logout={this.handleLogOut} />
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
