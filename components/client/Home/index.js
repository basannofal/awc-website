import Navbar from "@/layouts/Client/Navbar";
import React from "react";
import HeroSection from "./HeroSection";
import Products from "./Products";
import Contact from "./Contact";
import Footer from "@/layouts/Client/Footer";


const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Products />
      <Contact />
      <Footer />
    </>
  );
};

export default index;
