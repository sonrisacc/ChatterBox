import React from 'react';

const MessageCard = props => (
  <div className="msnCard">
    <h5>{`${props.author}: `}</h5>
    <p>{props.message}</p>
  </div>
);

export default MessageCard;
