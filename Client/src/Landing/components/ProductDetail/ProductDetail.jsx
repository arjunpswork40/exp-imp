import React, { useState } from "react";
import "./ProductDetail.css";
import { Container } from "@mui/material";
// import Navbar from "./DetailComponents/Navbar";
import Gallery from "./DetailComponents/Gallery";
import Description from "./DetailComponents/Description";
import MobileGallery from "./DetailComponents/MobileGallery";
import Header from "../header/Header";
import Footer from "../Footer/Footer";


export default function ProductDetail() {
    const [quant, setQuant] = useState(0);
    // const [orderedQuant, setOrderedQuant] = useState(0);

    const addQuant = () => {
        setQuant(quant + 1);
    };

    const removeQuant = () => {
        setQuant(quant - 1);
    };

    // const resetQuant = () => {
    //     setQuant(0);
    //     setOrderedQuant(0);
    // };
  return (
    <main className="App">
    <Header/>

      <Container component="section" maxWidth={"lg"}>
        {/* <Navbar onOrderedQuant={orderedQuant} onReset={resetQuant} /> */}
        <section className="core">
          <Gallery />
          <MobileGallery />
          <Description
            onQuant={quant}
            onAdd={addQuant}
            onRemove={removeQuant}
            // onSetOrderedQuant={setOrderedQuant}
          />
        </section>
      </Container>
      <Footer/>
    </main>
  )
}


