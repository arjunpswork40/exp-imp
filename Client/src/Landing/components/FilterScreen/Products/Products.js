import React from 'react';
import PropTypes from 'prop-types';
import "./Product.css";

const Products = ({ result }) => {
  return (
    <>
      {/* <section className="card-container"><div class="card-row">{result}</div></section> */}
      <section className="card-container">
        {result}
      </section>
    </>
  );
};

// Add prop types validation
Products.propTypes = {
  result: PropTypes.array.isRequired, // Assuming 'result' is an array
};

export default Products;
