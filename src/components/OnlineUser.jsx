import React from 'react';
import PropTypes from 'prop-types';

const OnlineUser = props => (
  <div className="online-user">
    <button onClick={props.click} className="btn userBtn">
      {' '}
      + {props.name}
    </button>
  </div>
);

OnlineUser.propTypes = {
  click: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired // eslint-disable-line
};

export default OnlineUser;
