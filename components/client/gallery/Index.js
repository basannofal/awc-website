import React, { useState } from "react";
import HeroSection from "./HeroSection";
import Navbar from "@/layouts/Client/Navbar";
import Images from "./Images";
import Footer from "@/layouts/Client/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Navbar />
      <HeroSection onSelectCategory={setSelectedCategory}  selectedCategory={selectedCategory}  />
      <Images selectedCategory={selectedCategory} />
      <Footer />
    </>
  );
};

export default Index;
