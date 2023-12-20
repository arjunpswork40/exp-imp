// import React, { useState } from "react";
// import css from './Filter.module.css';
// import Header from "../header/Header";
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Footer from '../Footer/Footer';
// import Select from "react-select";

// const options = [
//     { value: "electronics", label: "Electronics" },
//     { value: "clothing", label: "Clothing" },
//     { value: "books", label: "Books" },
//     // Add more category options as needed
//   ];

// const Filter = () => {
//     const [selectedCategory, setSelectedCategory] = useState(null);

//     const handleChange = (selectedOption) => {
//       setSelectedCategory(selectedOption);
//     };
  
//     return(
//         <>
//             <Header/>
//             <header class={css.fixedHeader}>
//                 <div class={css.filterHeader}> 
//                     <DropdownButton id="dropdown-basic-button" title="Country" variant="secondary" className={css.dropdown}>
//                         <Dropdown.Item href="#/action-1">India</Dropdown.Item>
//                         <Dropdown.Item href="#/action-2">Africa</Dropdown.Item>
//                         <Dropdown.Item href="#/action-3">UK</Dropdown.Item>
//                     </DropdownButton>
//                     <DropdownButton id="dropdown-basic-button" title="Filter" variant="secondary" className={css.dropdown}>
//                         <Dropdown.Item href="#/action-1">India</Dropdown.Item>
//                         <Dropdown.Item href="#/action-2">Africa</Dropdown.Item>
//                         <Dropdown.Item href="#/action-3">UK</Dropdown.Item>
//                     </DropdownButton>
//                     <input type="text" className={css.search} placeholder='Search' />
//                 </div>
//             </header>

//             <div className={css.wrapper}>
//                 <div className={css.left}>
//                     <div className={css.leftMainDiv}>
//                         <section className={css.leftSection}>
//                             <div  className={css.leftHeaderOne}>
//                                 <div className={css.leftHeaderTwo}>
//                                     <span>Filters</span>
                                   
//                                 </div>
//                             </div>
//                         </section>
//                     </div>
//                     <Select
//                                 options={options}
//                                 value={selectedCategory}
//                                 onChange={handleChange}
//                                 className={css.categoryDropdown}
//                                 isSearchable={false} // Disable search input
//                                 placeholder="Select Category"
//                             />
//                 </div>
//                 <div className={css.right}>
                    
//                 </div>
//             </div>

//             <Footer />

            
//         </>
//     )
// }
// export default Filter


import React, { useState } from 'react'
import Products from './Products/Products'
import Recommended from './Recommended/Recommended'
import css from "./Filter.module.css"
import Header from '../header/Header'
import Sidebar from './Sidebar/Sidebar'

import products from '../../db/db'
import Card from '../Generals/Card'
import Footer from '../Footer/Footer'

export default function Filter() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
    }

    // Applying selected filter
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <a href={`product-detail/${Math.random()}`} class="card-link" key={Math.random()}><Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        /></a>
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
    <Header/>
    <div className={css.mainFilter}>
        <Sidebar handleChange={handleChange} query={query} handleInputChange={handleInputChange} />
        {/* <Navigation query={query} handleInputChange={handleInputChange} /> */}
        <Recommended handleClick={handleClick} />
        <Products result={result} />
    </div>
    <Footer />
    </>
  )
}
