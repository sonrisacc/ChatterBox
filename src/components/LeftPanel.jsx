import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GeneralInfo from './leftPanel/GeneralInfo';
import OnlineUser from './leftPanel/OnlineUser';

class LeftPanel extends Component {
  static propTypes = {
    userList: PropTypes.object.isRequired, // eslint-disable-line
    isChatting: PropTypes.func.isRequired
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

  render() {
    const { userList } = this.props;
    return (
      <div className="userlist">
        <div className="userlist_header">
          <GeneralInfo />
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
