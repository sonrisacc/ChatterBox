import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Inputbox extends Component {
  // state = {
  //   msgBody: ''
  // };

  setRef = node => {
    this.test = node;
  };
  handleKeyPress = e => {
    if (e.charCode === 13 && e.altKey) {
      console.log('do validate');
      console.log('hey', this.test.value);
      this.test.value = '';
    }
  };

  render() {
    return (
      <div className="input-box">
        <div className="dropdown">
          <div className="dropdown-content">
            <ul>30s</ul>
            <ul>1 min</ul>
            <ul>2 min</ul>
            <ul>5 min</ul>
            <ul>1 hr</ul>
          </div>
          <button className="dropbtn">+</button>
        </div>
        {/* <div role="button" onKeyPress={this.handleKeyPress}> */}
        {/* <div
            className="input-area"
            contentEditable="true"
            aria-multiline="true"
            role="textbox"
            aria-label="Note"
            spellCheck="true"

          /> */}
        <textarea
          className="input-area"
          rows="4"
          cols="50"
          ref={this.setRef}
          placeholder="Type......."
          onKeyPress={this.handleKeyPress}
        />
        {/* </div> */}
      </div>
    );
  }
}

export default Inputbox;
// const mapStateToProps = state => ({
//   loginUsername: state.loginUsername
// });

// export default connect(mapStateToProps)(Inputbox);
