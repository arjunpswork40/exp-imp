import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClickHandler, value, title, styleDetails }) => {
  let style = {};
  if(styleDetails.value === value) {
    style = styleDetails.style
  }
  return (
    <button style={style} onClick={() => onClickHandler(value)} value={value} className="btns">
      {title}
    </button>
  );
};
Button.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  styleDetails: PropTypes.object.isRequired
};
export default Button;
