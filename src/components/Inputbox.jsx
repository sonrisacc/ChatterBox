import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import { emitNewMsg, emitTypingEvent } from '../utli/socketHelpers';

const DEFAULT_HEIGHT = 20;
class Inputbox extends Component {
  state = {
    msgBody: '',
    textAreaHeight: DEFAULT_HEIGHT,
    listIsHidden: true,
    showFormValidation: false
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

  getExpandableField = () => (
    <textarea
      className="input-area"
      rows="4"
      cols="50"
      style={{ height: this.state.textAreaHeight }}
      ref={this.setTextAreaRef}
      placeholder="Type......."
      onKeyPress={this.handleKeyPress}
      onChange={this.setValue}
      onKeyUp={this.handleTextAreaChange}
    />
  );

  getGhostField = () => (
    <div className="input-area ghost" ref={this.setGhostRef} aria-hidden="true">
      {this.state.msgBody}
    </div>
  );

  handleTextAreaChange = () => {
    this.setFilledTextareaHeight();
    // need debounce
    emitTypingEvent(this.props.loginUsername);
  };

  handleKeyPress = e => {
    if (e.charCode === 13 && e.shiftKey) {
      if (!this.textAreaNode.value.replace(/\s/g, '').length) {
        // string only contained whitespace (ie. spaces, tabs or line breaks)
        console.log('invalid input');
        this.toggleRenderFormValidation();
        this.textAreaNode.value = '';
        setTimeout(this.toggleRenderFormValidation, 1000);
      } else {
        emitNewMsg(this.props.loginUsername, this.textAreaNode.value);
        this.textAreaNode.value = '';
      }
    }
  };

  toggleRenderFormValidation = () => {
    this.setState({ showFormValidation: !this.state.showFormValidation });
  };

  toggleHiddenList = () => {
    this.setState({ listIsHidden: !this.state.listIsHidden });
  };

  renderInvalidInputExists = () => (
    <div className="form-validation"> InvalidInput </div>
  );

  render() {
    return (
      <div className="editing-box">
        {this.getGhostField()}
        <div className="input-box">
          <div className="dropdown">
            <button className="dropbtn" onClick={this.toggleHiddenList}>
              +
            </button>
          </div>
          {this.getExpandableField()}
        </div>
        {!this.state.listIsHidden && <Dropdown />}
        {!!this.state.showFormValidation && this.renderInvalidInputExists()}
      </div>
    );
  }
}

// export default Inputbox;
const mapStateToProps = state => ({
  loginUsername: state.loginUsername
});

export default connect(mapStateToProps)(Inputbox);
