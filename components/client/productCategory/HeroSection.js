import axios from "axios";
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

  useEffect(() => {
    const fetchData = async () => {
      await getCategory();
    };
    fetchData();
  }, []);
  return (
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
  );
};

export default HeroSection;
