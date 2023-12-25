import React from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Form from "./Form";
import Footer from "@/layouts/Client/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Form />
      <Footer />
    </>
  );
};

export default index;
