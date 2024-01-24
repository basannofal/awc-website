import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Product from "./Product";
import Contact from "./Contact";
import Question from "./Question";
import Footer from "@/layouts/Client/Footer";
import Watshapp from "@/layouts/Client/Watshapp";

const index = ({ cid }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (cid) {
      setLoading(false);
    }
  }, [cid]);

  return (
    <>
      {loading ? (
        <div className="fixed top-12 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <Watshapp />
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
