import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';
import { emitNewMsg, emitTypingEvent } from '../utli/socketHelpers';

const DEFAULT_HEIGHT = 20;
const DEFAULT_SELECT_VALUE = 'A';
class Inputbox extends Component {
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
    // need debounce
    emitTypingEvent(this.props.loginUsername);
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
        this.state.selectValue
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
    <div className="form-validation"> InvalidInput </div>
  );

  renderGhostField = () => (
    <div className="input-area ghost" ref={this.setGhostRef} aria-hidden="true">
      {this.state.msgBody}
    </div>
  );

  renderExpandableField = () => (
    // <div className="textarea-box">
    <textarea
      className="input-area"
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
          <div className="input-box">
            <div className="dropdown">
              <Dropdown
                optionsState={this.state.selectValue}
                change={this.handleLifeSpanSlection}
              />
            </div>
            {this.renderExpandableField()}
            <button className="inputBtn" onClick={this.handleSubmit}>
              Send
            </button>
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
