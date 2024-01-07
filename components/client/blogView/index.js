import React from "react";
import Navbar from "@/layouts/Client/Navbar";
import Blog from "./Blog";
import Footer from "@/layouts/Client/Footer";

const index = ({ bid }) => {
  return (
    <>
      <Navbar />
      <Blog bid={bid} />
      <Footer />
    </>
  );
};

export default index;
