import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import HeroSection from "./HeroSection";
import Product from "./Product";
import Contact from "./Contact";
import Question from "./Question";
import Footer from "@/layouts/Client/Footer";
import axios from "axios";

const index = ({ cid }) => {
  const [loading, setLoading] = useState(true);
  const [CategoryProduct, setCategoryProduct] = useState([]);
  console.log(cid);
  const getCategoryProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-category/category-products/${cid}`
      );
      setCategoryProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getTestimonial = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-category/category-products/${cid}`
      );
      setCategoryProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await getCategoryProducts();
      await getTestimonial();
      setLoading(false)
    };
    if (cid) {
      fetchData();
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
          <Contact data={CategoryProduct} />
          <Question />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
