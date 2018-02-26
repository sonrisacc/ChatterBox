import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { setLoginUserName } from '../actionCreators';

const Landing = () => (
  <div className="landing">
    <h1>Hello</h1>
    <input type="text" placeholder="Username" />
    <Link to="/lobby"> LogIn </Link>
    <Link to="/signUp"> SignUp </Link>
  </div>
);

// const mapStateToProps = state => ({ setLoginUserName: state.userName });
// const mapDispatchToProps = dispatch => ({
//   handleLoginUserNameChange(event) {
//     dispatch(setLoginUserName(event.target.value));
//   }
// });
export default Landing;

// export default connect(mapStateToProps,mapDispatchToProps)(Landing);
