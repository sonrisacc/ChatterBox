import React from 'react';

const MessageCard = props => (
  <div className="msnCard">
    <div className="msnCard-header">
      <div id="msnCard-time">{props.createdAt}</div>
      <div id="msnCard-delete">delete</div>
    </div>
    <div className="msnCard-body">
      <h5>{`${props.author}: `}</h5>
      <p>{props.message}</p>
    </div>
  </div>
);

export default MessageCard;
