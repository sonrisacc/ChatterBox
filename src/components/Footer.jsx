import React from 'react';
import PropTypes from 'prop-types';

const Footer = props => (
  <div className="footer">
    <button onClick={props.logout}>Log out</button>
  </div>
);

Footer.propTypes = {
  logout: PropTypes.func.isRequired
};
export default Footer;
