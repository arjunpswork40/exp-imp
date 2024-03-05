import React from 'react';
import PropTypes from 'prop-types';
import "./Product.css";
import Card from "../../Generals/Card"

const Products = ({ result,handleDetailsCreatClick }) => {
  return (
    <>
      {/* <section className="card-container"><div class="card-row">{result}</div></section> */}
      <section className="card-container">

        {result.length > 0 ?
        (result) :
        <p>No data found</p>
        }
      </section>
    </>
  );
};

// Add prop types validation
Products.propTypes = {
  result: PropTypes.array.isRequired, // Assuming 'result' is an array
  handleDetailsCreatClick: PropTypes.func.isRequired
};

export default Products;
