import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Footer from "@/layouts/Client/Footer";
import Tabs from "./Tabs";
import axios from "axios";
import Head from "next/head";

const index = ({ pid }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([])

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproduct/${pid}`
      );
      setProducts(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductData();
    };
    fetchData();
  }, [pid]);
  return (
    <>
      {loading ? (
        <h1>Loding</h1>
      ) : (
        <>
        <Head>
        <title>{products?.product_title || "Products"}</title>
            <meta
              name="keywords"
              content={
                products?.meta_keyword || "Products, AWC Products, AWC India"
              }
            />
            <meta
              name="description"
              content={
                products?.meta_desc || "Products, AWC Products, AWC India"
              }
            />
            {products?.canonical_url && (
              <link rel="canonical" href={products?.canonical_url} />
            )}
          </Head>
          <Navbar />
          <HeroSection product={products} />
          <Tabs pid={pid} lognDesc={products?.product_long_desc}/>
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
