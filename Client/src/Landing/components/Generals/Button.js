import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClickHandler, value, title }) => {
  return (
    <button onClick={onClickHandler} value={value} className="btns">
      {title}
    </button>
  );
};
Button.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
};
export default Button;
