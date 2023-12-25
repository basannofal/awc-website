import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Product from "./Product";
import Question from "./Question";
import Footer from "@/layouts/Client/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Product />
      <Question />
      <Footer />
    </>
  );
};

export default index;
