import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ handleChange, value, title, name, color }) => {
  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};
Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  name: PropTypes.func.isRequired,
  color: PropTypes.func.isRequired,
};
export default Input;
