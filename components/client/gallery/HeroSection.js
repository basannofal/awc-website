import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeroSection = ({ onSelectCategory, selectedCategory }) => {
  const [loading, setLoading] = useState(true);
  const [allProdCategory, setAllProdCategory] = useState([]);

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/gallery/allcategory/router`
      );
      setAllProdCategory(response.data);
      onSelectCategory(response.data[0].id);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="gallery-sec">
        <div className="gallery-container">
          <div className="gallery-main-inner">
            <h1 className="gallery-main-title">
              <span className="main-title-color">PHOTO</span> GALLERY
            </h1>
            <p className="gallery_desc">
              Don’t believe us? Have a look at some of our recent successful
              projects. This will give you an idea of our capabilities as a
              leading waterproofing company and also let you visualise how your
              structure will look after completion.
            </p>
            <div className="grid" style={{ marginTop: 10 }}>
              {allProdCategory.map((item, idx) => {
                return (
                  <div
                    key={item.id}
                    className={`lg-4 md-6 ${
                      selectedCategory == item.id
                        ? "gallery-btn-primary gallery-btn1"
                        : "gallery-btn-primary gallery-btn2"
                    }`}
                    onClick={() => handleCategorySelect(item.id)}
                    style={{ margin: 10 }}
                  >
                    {item.category_title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
