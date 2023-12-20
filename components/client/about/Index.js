import React from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import About from "./About";
import VisionMision from "./VisionMision";
import Timeline from "./Timeline";
import Certificate from "./Certificate";
import Footer from "@/layouts/Client/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />
      <VisionMision />
      <Timeline />
      <Certificate />
      <Footer />
    </>
  );
};

export default Index;
