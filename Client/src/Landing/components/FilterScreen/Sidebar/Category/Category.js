import React from 'react';
import PropTypes from 'prop-types';
import "./Category.css";
import Input from "../../../Generals/Input";

function Category({ handleChange,data,styleDetails }) {
  let countries = data?.data?.data ?? [];
  let checkedValue = false;
  let countryIds = styleDetails.countryIds;
  if( Array.isArray(countryIds) && countryIds.includes('all')) {
    checkedValue = true;
  }
  return (
    <div>
      <h2 className="sidebar-title">Countries</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="checkbox" value="all"  name="test" />
          <span className="checkmark"></span>All
        </label>

        {
          countries.map((item,index) => (
            <Input
              key={index}
              handleChange={handleChange}
              value={item._id}
              title={item.name}
              name={item.name}
              styleDetails={styleDetails}
            />
          ))
        }


      </div>
    </div>
  );
}

Category.propTypes = {
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object,
  styleDetails: PropTypes.object.isRequired,
};
export default Category;
