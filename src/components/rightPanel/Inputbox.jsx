import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  emitNewMsg,
  emitTypingEvent,
  emitTypingEventStoped
} from '../../utli/socketHelpers';

import Dropdown from './Dropdown';

const DEFAULT_HEIGHT = 20;
const DEFAULT_SELECT_VALUE = 'A';
let id; // for clearTimeout deouncing user type event

class Inputbox extends Component {
  static propTypes = {
    loginUsername: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired
  };

  state = {
    msgBody: '',
    textAreaHeight: DEFAULT_HEIGHT,
    listIsHidden: true,
    showFormValidation: false,
    selectValue: DEFAULT_SELECT_VALUE
  };

  setTextAreaRef = node => {
    this.textAreaNode = node;
  };

  setGhostRef = node => {
    this.ghost = node;
  };

  setValue = e => {
    const { value } = e.target;
    this.setState({ msgBody: value });
  };

  setFilledTextareaHeight = () => {
    const ghostHeight = this.ghost.clientHeight;
    this.setState({ textAreaHeight: ghostHeight });
  };

  handleTextAreaChange = () => {
    this.setFilledTextareaHeight();
    clearTimeout(id);
    emitTypingEvent(this.props.loginUsername);
    id = setTimeout(() => emitTypingEventStoped(this.props.loginUsername), 500);
  };

  handleLifeSpanSlection = e => {
    console.log('lifespan', e.target.value);
    this.setState({ selectValue: e.target.value });
  };

  handleSubmit = () => {
    if (!this.textAreaNode.value.replace(/\s/g, '').length) {
      // string only contained whitespace (ie. spaces, tabs or line breaks)
      console.log('invalid input');
      this.toggleRenderFormValidation();
      this.textAreaNode.value = '';
      this.state.selectValue = DEFAULT_SELECT_VALUE;
      setTimeout(this.toggleRenderFormValidation, 1000);
    } else {
      emitNewMsg(
        this.props.loginUsername,
        this.textAreaNode.value,
        this.state.selectValue,
        this.props.room
      );
      this.textAreaNode.value = '';
      this.setState({ selectValue: DEFAULT_SELECT_VALUE });
    }
  };

  handleKeyPress = e => {
    if (e.charCode === 13 && e.shiftKey) {
      this.handleSubmit();
    }
  };

  toggleRenderFormValidation = () => {
    this.setState({ showFormValidation: !this.state.showFormValidation });
  };

  toggleHiddenList = () => {
    this.setState({ listIsHidden: !this.state.listIsHidden });
  };

  renderInvalidInputExists = () => (
    <div className="editing-box_hidden"> InvalidInput </div>
  );

  renderGhostField = () => (
    <div className="input-area ghost" ref={this.setGhostRef} aria-hidden="true">
      {this.state.msgBody}
    </div>
  );

  renderExpandableField = () => (
    // <div className="textarea-box">
    <textarea
      rows="4"
      cols="50"
      style={{ height: this.state.textAreaHeight }}
      ref={this.setTextAreaRef}
      placeholder="Shift + Enter to send Messages"
      onKeyPress={this.handleKeyPress}
      onChange={this.setValue}
      onKeyUp={this.handleTextAreaChange}
    />
    // </div>
  );

  render() {
    return (
      <div>
        {this.renderGhostField()}
        <div className="editing-box">
          {!!this.state.showFormValidation && this.renderInvalidInputExists()}
          <div className="editing-box_body">
            <div className="editing-box_body_dropdown">
              <Dropdown
                optionsState={this.state.selectValue}
                change={this.handleLifeSpanSlection}
              />
            </div>
            <div className="editing-box_body_inputarea">
              {this.renderExpandableField()}
              <button onClick={this.handleSubmit}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Inputbox;
const mapStateToProps = state => ({
  loginUsername: state.loginUsername
});

export default connect(mapStateToProps)(Inputbox);
