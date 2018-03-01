import React from 'react';

const Footer = props => (
  <div className="Footer">
    <button className="logout-btn" onClick={props.logout}>
      Log out
    </button>
  </div>
);

export default Footer;
