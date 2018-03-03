import React from 'react';

const Dropdown = props => (
  <div className="dropdown-content">
    <select value={props.optionsState} onChange={props.change}>
      <option value="A">LifeSpan</option>
      <option value="B">2s</option>
      <option value="C">5s</option>
      <option value="D">30s</option>
      <option value="E">1 min</option>
      <option value="F">2 min</option>
      <option value="G">5 min</option>
      <option value="H">1 hr</option>
    </select>
  </div>
);

export default Dropdown;
