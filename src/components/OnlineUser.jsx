import React from 'react';

const OnlineUser = props => (
  <div className="online-user">
    <button onClick={props.click} className="btn userBtn">
      {' '}
      + {props.name}
    </button>
  </div>
);

export default OnlineUser;
