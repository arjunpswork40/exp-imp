// Home.js
import React from 'react'
import Header from '../header/Header'
import Hero from '../Hero/Hero'
import Slider from '../Slider/Slider'
import Virtual from '../Virtual/Virtual'
import Products from '../Products/Products'
import Testimonials from '../Testimonials/Testimonials'
import Footer from '../Footer/Footer'
import './Home.css'
function Home() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Slider />
      <Virtual />
      <Products />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
