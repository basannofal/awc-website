import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Footer from "@/layouts/Client/Footer";
import Tabs from "./Tabs";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import Watshapp from "@/layouts/Client/Watshapp";

const index = ({ pid }) => {
  const router = useRouter()
  const { productType, productId } = router.query;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproduct/${productId}`
      );
      setProducts(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await getProductData();
  };

  useEffect(() => {
    fetchData();
  }, [productId]);
  return (
    <>
      {loading ? (
        <div className="fixed top-12 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
        </div>
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
          <Watshapp />
          <HeroSection product={products} />
          <Tabs productId={productId} lognDesc={products?.product_long_desc} />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
