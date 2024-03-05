import React from 'react';
import PropTypes from 'prop-types';

import { BsFillBagFill } from "react-icons/bs";

const Card = ({ img, title, shortName, state, prevPrice, newPrice }) => {
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            <span className="total-reviews">{state}</span>
          </section>
          <section className="card-price">
            <div className="price">
              {shortName}
            </div>

          </section>
        </div>
      </section>
    </>
  );
};
Card.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  prevPrice: PropTypes.string.isRequired,
  newPrice: PropTypes.string.isRequired,

};
export default Card;
