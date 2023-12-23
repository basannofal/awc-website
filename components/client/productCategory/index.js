import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Product from "./Product";
import Contact from "./Contact";
import Question from "./Question";
import Footer from "@/layouts/Client/Footer";

const index = ({ cid }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (cid) {
      setLoading(false)
    }
  }, [cid]);

  return (
    <>
      {loading ? (
        <h1>Loding</h1>
      ) : (
        <>
          <Navbar />
          <HeroSection cid={cid} />
          <Product cid={cid} />
          <Contact cid={cid} />
          <Question />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
