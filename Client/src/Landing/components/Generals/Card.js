import React from 'react';
import PropTypes from 'prop-types';

import { BsFillBagFill } from "react-icons/bs";

const Card = ({ img, title, star, reviews, prevPrice, newPrice }) => {
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">
              <BsFillBagFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </>
  );
};
Card.propTypes = {
  img: PropTypes.func.isRequired,
  title: PropTypes.func.isRequired,
  star: PropTypes.func.isRequired,
  reviews: PropTypes.func.isRequired,
  prevPrice: PropTypes.func.isRequired,
  newPrice: PropTypes.func.isRequired,

};
export default Card;
