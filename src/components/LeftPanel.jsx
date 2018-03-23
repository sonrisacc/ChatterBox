import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GeneralInfo from './leftPanel/GeneralInfo';
import OnlineUser from './leftPanel/OnlineUser';
import { receiveNotifiySelectedUser } from '../utli/socketHelpers';

class LeftPanel extends Component {
  static propTypes = {
    userList: PropTypes.object.isRequired, // eslint-disable-line
    isChatting: PropTypes.func.isRequired
  };
  state = {
    showNotification: false
  };

  componentDidMount() {
    receiveNotifiySelectedUser(this.handleReceiveInvitation);
  }

  handleReceiveInvitation = data => {
    console.log('handle show showNotification', data);
    this.setState({ showNotification: true });
    setTimeout(() => {
      this.setState({ showNotification: false });
    }, 2000);
  };

  renderUserList = userList => {
    const userListArr = Object.keys(userList);
    return userListArr.map(curUser => (
      <OnlineUser
        key={this.props.userList[curUser]}
        name={curUser}
        id={this.props.userList[curUser]}
        click={this.props.isChatting}
      />
    ));
  };

  renderNotification = () => <div>one new invitation</div>;

  render() {
    const { userList } = this.props;
    const { showNotification } = this.state;

    return (
      <div className="userlist">
        <div className="userlist_header">
          <GeneralInfo />
          <div>{!!showNotification && this.renderNotification()}</div>
        </div>
        <div className="userlist_body">
          {!!userList && this.renderUserList(userList)}
        </div>
        {/* <div className="userlist_footer">footer</div> */}
      </div>
    );
  }
}
export default LeftPanel;
