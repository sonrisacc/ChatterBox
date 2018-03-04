import React from 'react';
import PropTypes from 'prop-types';

const OnlineUser = props => (
  <div className="userlist_body_info">
    <button onClick={props.click}> + {props.name}</button>
  </div>
);

OnlineUser.propTypes = {
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired // eslint-disable-line
};

export default OnlineUser;
