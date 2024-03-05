import React from 'react';
import PropTypes from 'prop-types';

import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import "./Sidebar.css";
import Search from "./Search/Search";
import { useState } from "react";

const Sidebar = ({ handleChange,handleInputChange, query, data, styleDetails }) => {
  const [navWidth, setNavWidth] = useState(0);

  const openNav = () => {
    setNavWidth(250);
  };

  const closeNav = () => {
    setNavWidth(0);
  };


  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <p>Educational Institutes</p>
        </div>
        <Search query={query} handleInputChange={handleInputChange} />
        <Category styleDetails={styleDetails} handleChange={handleChange} data={data} />
        {/* <Price handleChange={handleChange} />
        <Colors handleChange={handleChange} /> */}
      </section>
      <section className="sidebarMob">
      <span className="openCloseBtn" onClick={openNav}>&#9776; open filters</span>
      <div id="mySidenav" className="sidenav" style={{ width: `${navWidth}px` }}>
        <button className="closebtn" onClick={closeNav}>&times;</button>
        <div className="mobFilters">
          <div className="logo-container">
            <p>Educational Institutes</p>
          </div>
          <Search query={query} handleInputChange={handleInputChange} />
          <Category styleDetails={styleDetails} handleChange={handleChange} />
          {/* <Price handleChange={handleChange} />
          <Colors handleChange={handleChange} /> */}
        </div>
      </div>
      </section>
    </>
  );
};
Sidebar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  data: PropTypes.object,
  styleDetails: PropTypes.object.isRequired,

};
export default Sidebar;
