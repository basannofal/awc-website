import React from "react";
import HeroSection from "./HeroSection";
import Navbar from "@/layouts/Client/Navbar";
import Images from "./Images";
import Footer from "@/layouts/Client/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Images />
      <Footer />
    </>
  );
};

export default Index;
