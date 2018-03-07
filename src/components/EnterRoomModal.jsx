import React from 'react';
import PropTypes from 'prop-types';

const RoomModal = props => (
  <div className="modal ">
    <div className="modal_content">
      <div className="modal_content_header">
        <button className="close" onClick={props.handleCloseModal}>
          &times;
        </button>
      </div>
      <div className="modal_content_body">
        <h1>Enter {props.title}</h1>
        <div id="options" className="modal_content_body_row" />
        <div className="modal_content_body_row">
          <p>Please enter password:</p>
          <input id="d" ref={props.setModalInputRef} placeholder="type..." />
        </div>
      </div>
      <div className="modal_content_footer">
        <button onClick={props.handlePwdCheck}>add</button>
      </div>
    </div>
  </div>
);

RoomModal.propTypes = {
  title: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  setModalInputRef: PropTypes.func.isRequired,
  handlePwdCheck: PropTypes.func.isRequired
};
export default RoomModal;
