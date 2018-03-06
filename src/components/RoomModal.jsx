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
        <h1>Add a new room</h1>
        <div id="options" className="modal_content_body_row">
          <p>Is Private:</p>
          <input
            onChange={props.handelToggelPrivacy}
            ref={props.setModalPrivacyRef}
            type="checkbox"
            id="a"
          />
        </div>
        <div className="modal_content_body_row">
          <p>Add a room:</p>
          <input id="b" ref={props.setModalInputRef} placeholder="type..." />
        </div>
        <div className="modal_content_body_row">
          <p>Password:</p>
          <input
            id="c"
            ref={props.setModalPasswordRef}
            placeholder="select private to enable"
            disabled="disabled"
          />
        </div>
      </div>
      <div className="modal_content_footer">
        <button onClick={props.handleAddInModal}>add</button>
      </div>
    </div>
  </div>
);

RoomModal.propTypes = {
  handelToggelPrivacy: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  setModalInputRef: PropTypes.func.isRequired,
  setModalPasswordRef: PropTypes.func.isRequired,
  handleAddInModal: PropTypes.func.isRequired,
  setModalPrivacyRef: PropTypes.func.isRequired
};
export default RoomModal;
