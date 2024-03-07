import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Container } from "@mui/material";
// import Navbar from "./DetailComponents/Navbar";
import Gallery from "./DetailComponents/Gallery";
import Description from "./DetailComponents/Description";
import MobileGallery from "./DetailComponents/MobileGallery";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import ContactForm from "./DetailComponents/ContactForm";
import { useParams } from "react-router-dom";
import LandingController from "../../../controllers/Landing/LandingController";

export default function ProductDetail() {

  const { instituteId,continent } = useParams();
  const [institutrDetails, setinstituteDetails] = useState({});
  useEffect(() => {
    const fetchData = async() => {
      try{
        let response = await LandingController.fetchInstituteDetails(continent,instituteId);
        if(response.success){
          setinstituteDetails(response.data);
        }
      }catch(error) {
        console.log(error);
      }
    }
    fetchData()

  },[continent,instituteId])

  // const [quant, setQuant] = useState(0);
  //   // const [orderedQuant, setOrderedQuant] = useState(0);

  //   const addQuant = () => {
  //       setQuant(quant + 1);
  //   };

  //   const removeQuant = () => {
  //       setQuant(quant - 1);
  //   };

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
          <Gallery
           institutrDetails={institutrDetails}
           />
          <MobileGallery
            institutrDetails={institutrDetails}
          />
          <Description
           institutrDetails={institutrDetails}
          />
        </section>
        <div className="contactForm">
          <ContactForm institutrDetails={institutrDetails} continent={continent}/>
        </div>
      </Container>
      <Footer/>
    </main>
  )
}


