import Navbar from "@/layouts/Client/Navbar";
import React, { useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import Products from "./Products";
import Contact from "./Contact";
import Footer from "@/layouts/Client/Footer";
import axios from "axios";
import Head from "next/head";

const index = () => {
  const [loading, setLoading] = useState(true);
  const [productCategories, setProductCategories] = useState([]);
  const [seoData, setSeoData] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/home/home-product-data/router`
      );
      const data = response.data;

      const categories = {};

      data.forEach((item) => {
        if (!categories[item.category_id]) {
          const productItem = {
            product_id: item.product_id,
            product_title: item.product_title,
          };

          categories[item.category_id] = {
            category_id: item.category_id,
            category_name: item.category_name,
            products: [productItem],
          };
        } else {
          const productItem = {
            product_id: item.product_id,
            product_title: item.product_title,
          };
          categories[item.category_id].products.push(productItem);
        }
      });

      const categoryArray = Object.values(categories);
      setProductCategories(categoryArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getSEOData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/home/router`
      );
      setSeoData(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
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
            <title>{seoData.home_title || "AWC India"}</title>
            <meta
              name="keywords"
              content={seoData.home_keyword || "Default Keywords"}
            />
            <meta
              name="description"
              content={seoData.home_desc || "Default Description"}
            />
            {seoData.home_canonical && (
              <link rel="canonical" href={seoData.home_canonical} />
            )}
          </Head>

          <Navbar />
          <HeroSection />
          <Products productCategories={productCategories} />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
