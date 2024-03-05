import React from 'react';
import PropTypes from 'prop-types';

import "./Search.css";

function Search({ handleInputChange, query }) {
  return (
    <div>
       <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search."
        />
    </div>
  );
}
Search.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
export default Search;
