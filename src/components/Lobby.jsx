import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getApiDetails } from '../actions/actionCreators';

import MessageCard from './MessageCard';
import Header from './Header';
import Inputbox from './Inputbox';
import Footer from './Footer';
import GeneralInfo from './GeneralInfo';
import { emitUserLeft } from '../utli/socketHelpers';

class Lobby extends Component {
  componentDidMount() {
    this.props.handleGetApiDetails();
  }

  goToHistory = () => {
    this.props.history.push('/history');
  };

  handleLogOut = () => {
    emitUserLeft(this.props.loginUsername);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="container">
        <Header />
        <div className="lobby-wrapper">
          <GeneralInfo />
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
