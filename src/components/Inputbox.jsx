import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Inputbox extends Component {
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
          <button className="dropbtn">Dropdown</button>
        </div>
        <div
          className="input-area"
          contentEditable="true"
          aria-multiline="true"
          role="textbox"
          aria-label="Note"
          spellCheck="true"
        >
          Start typing here..
        </div>
      </div>
    );
  }
}

export default Inputbox;
// const mapStateToProps = state => ({
//   loginUsername: state.loginUsername
// });

// export default connect(mapStateToProps)(Inputbox);
