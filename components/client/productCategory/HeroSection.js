import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const HeroSection = ({ cid, data }) => {
  const [Category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-category/${cid}`
      );
      setCategory(response.data[0]);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    await getCategory();
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Head>
        <title>{Category.category_name || "Product Category"}</title>
            <meta
              name="keywords"
              content={
                Category.meta_keyword || "Product Category, AWC Product Category, AWC India"
              }
            />
            <meta
              name="description"
              content={
                Category.meta_description || "Product Category, AWC Product Category, AWC India"
              }
            />
            {Category.canonical_url && (
              <link rel="canonical" href={Category.canonical_url} />
            )}
      </Head>
      <section className="roof-banner-sec">
        <div className="container">
          <div className="roof-banner-inner">
            <p className="sub-title">Awc India</p>
            <h1 className="main-title">{Category && Category.category_name}</h1>
            <p
              className="dec"
              dangerouslySetInnerHTML={{
                __html: Category && Category.category_description,
              }}
            ></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
