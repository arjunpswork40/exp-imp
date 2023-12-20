// import "./App.css";
// import Footer from "./components/Footer/Footer";
// import Hero from "./components/Hero/Hero";
// import Products from "./components/Products/Products";
// import Slider from "./components/Slider/Slider";
// import Testimonials from "./components/Testimonials/Testimonials";
// import Virtual from "./components/Virtual/Virtual";
// import Header from "./components/header/Header";
// import { BrowserRouter as Main , Route, Routes } from "react-router-dom";
// import Filter from "./components/FilterScreen/Filter";

// function App() {
//   return (
//     <>
//     <Main>
//       <div className="App">
//         <Header/>
//         <Hero/>
//         <Slider/>
//         <Virtual/>
//         <Products />
//         <Testimonials />
//         <Footer />
//       </div>
//       <Routes>
//         {/* <Route exact path="/" element={<}></Route> */}
//         <Route exact path="/search" element={<Filter/>}></Route>
//       </Routes>
//     </Main>
     
//     </>
   
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Filter from './components/FilterScreen/Filter';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Dashboard from './dashboard/Dashboard';
import AuthPage from './AuthPage/AuthPage';
// import AdminLayout from "./dashboard2/src/layouts/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/import-export-products" element={<Filter />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/authenticate" element={<AuthPage />} />
          {/* <Route path="/admin" element = {<AdminLayout />} /> */}
        </Routes>
      </Router>
      
  </>
  );
}

export default App;
