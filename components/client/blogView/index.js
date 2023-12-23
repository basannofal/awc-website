import React from "react";
import Navbar from "@/layouts/Client/Navbar";
import Blog from "./Blog";
import Footer from "@/layouts/Client/Footer";

const index = () => {
  return (
    <>
      <Navbar />
      <Blog />
      <Footer />
    </>
  );
};

export default index;
