import React from "react";
import plus from "../Pictures/icon-plus.svg";
import minus from "../Pictures/icon-minus.svg";
import PropTypes from 'prop-types';


const QuantityButton = ({ onQuant, onRemove, onAdd }) => {
  return (
    <div className="amount">
      <button className="minus" onClick={onRemove} disabled={onQuant === 0}>
        <img src={minus} alt="icon-minus" />
      </button>
      <p>{onQuant}</p>
      <button className="plus" onClick={onAdd} disabled={onQuant === 100}>
        <img src={plus} alt="icon-plus" />
      </button>
    </div>
  );
};

QuantityButton.propTypes = {
  onQuant: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

export default QuantityButton;
