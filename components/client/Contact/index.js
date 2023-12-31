import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import Footer from "@/layouts/Client/Footer";
import HeroSection from "./HeroSection";
import axios from "axios";
import Head from "next/head";

const index = () => {
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSEOData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/contact/router`
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
            <title>{seoData.contact_title || "Contact Us"}</title>
            <meta
              name="keywords"
              content={
                seoData.contact_keyword ||
                "Contact, AWC Contact, AWC Contact Us, AWC India"
              }
            />
            <meta
              name="description"
              content={
                seoData.contact_desc ||
                "Contact, AWC Contact, AWC Contact Us, AWC India"
              }
            />
            {seoData.contact_canonical && (
              <link rel="canonical" href={seoData.contact_canonical} />
            )}
          </Head>
          <Navbar />
          <HeroSection />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
