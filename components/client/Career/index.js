import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Footer from "@/layouts/Client/Footer";
import Form from "./Form";
import axios from "axios";
import Head from "next/head";

const index = () => {
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSEOData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/career/router`
      );
      setLoading(false);
      setSeoData(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSEOData();
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="fixed top-12 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <>
          <Head>
            <title>{seoData.carrer_title || "Career"}</title>
            <meta
              name="keywords"
              content={
                seoData.carrer_keyword || "Careers, AWC Careers, AWC India"
              }
            />
            <meta
              name="description"
              content={seoData.carrer_desc || "Careers, AWC Careers, AWC India"}
            />
            {seoData.carrer_canonical && (
              <link rel="canonical" href={seoData.carrer_canonical} />
            )}
          </Head>
          <Navbar />
          <HeroSection />
          <Form />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
