import React from 'react';
import PropTypes from 'prop-types';

const Privatechat = props => (
  <div className="Privatechat">
    <h1>Private Room with the cur user </h1>
    <p>{JSON.stringify(props.localDetail)}</p>
    <p>password</p>
    <p>group member</p>
  </div>
);

Privatechat.propTypes = {
  localDetail: PropTypes.object.isRequired // eslint-disable-line
};

export default Privatechat;
