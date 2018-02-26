import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => (
  <div className="Signup">
    <h1>Hello</h1>
    <input type="text" placeholder="Username" />
    <Link to="/lobby"> Take me to lobby </Link>
  </div>
);

export default Signup;
