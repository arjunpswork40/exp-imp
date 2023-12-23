import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Filter from './components/FilterScreen/Filter'
import Home from './components/Home/Home'
import ProductDetail from './components/ProductDetail/ProductDetail'
import Dashboard from './dashboard/Dashboard'
import AuthPage from './AuthPage/AuthPage'
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
  )
}

export default App
