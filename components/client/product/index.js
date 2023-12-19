import React from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Product from "./Product";
import Contact from "./Contact";
import Question from "./Question";
import Footer from "@/layouts/Client/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Product />
      <Contact />
      <Question />
      <Footer />
    </>
  );
};

export default index;
