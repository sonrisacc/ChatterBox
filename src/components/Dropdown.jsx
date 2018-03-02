import React from 'react';

const Dropdown = props => (
  <div className="dropdown-content">
    <select value={props.optionsState} onChange={props.change}>
      <option value="A">+</option>
      <option value="B">30s</option>
      <option value="C">1 min</option>
      <option value="D">2 min</option>
      <option value="E">5 min</option>
      <option value="F">1 hr</option>
    </select>
  </div>
);

export default Dropdown;
