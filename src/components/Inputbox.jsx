import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Dropdown from './Dropdown';

const DEFAULT_HEIGHT = 20;
class Inputbox extends Component {
  state = {
    msgBody: '',
    textAreaHeight: DEFAULT_HEIGHT
  };

  setRef = node => {
    this.test = node;
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
      ref={this.setRef}
      placeholder="Type......."
      onKeyPress={this.handleKeyPress}
      onChange={this.setValue}
      onKeyUp={this.setFilledTextareaHeight}
    />
  );

  getGhostField = () => (
    <div className="input-ghost" ref={this.setGhostRef} aria-hidden="true">
      {this.state.msgBody}
    </div>
  );

  handleKeyPress = e => {
    if (e.charCode === 13 && e.altKey) {
      console.log('do validate');
      console.log('hey', this.test.value);
      this.test.value = '';
    }
  };

  render() {
    return (
      <div className="editing-box">
        <div className="input-box">
          <Dropdown />
          {this.getExpandableField()}
        </div>
        <div className="input-box">{this.getGhostField()}</div>
      </div>
    );
  }
}

export default Inputbox;
// const mapStateToProps = state => ({
//   loginUsername: state.loginUsername
// });

// export default connect(mapStateToProps)(Inputbox);
