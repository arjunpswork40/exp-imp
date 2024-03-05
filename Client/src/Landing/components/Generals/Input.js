import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ handleChange, value, title, name }) => {

  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="checkbox" value={value} name={name} />
      <span className="checkmark"></span>
      {title}
    </label>
  );
};
Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Input;
