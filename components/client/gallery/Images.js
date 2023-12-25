import axios from "axios";
import React, { useEffect, useState } from "react";

const Images = ({ selectedCategory }) => {
  const [loading, setLoading] = useState(true);
  const [galleryPhoto, setGalleryPhoto] = useState([])

  const getImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/gallery/categoryimage/${selectedCategory}`
      );
      console.log(response.data);
      setGalleryPhoto(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getImages();
    };
    fetchData();
  }, [selectedCategory]);
  return (
    <>
      <section className="gallery-image-sec">
        <div className="gallery-image-container">
          <div className="gallery-image-main-inner">
            <div className="grid">
            {galleryPhoto.map((image, index) => (
                <div
                  key={index}
                  className={`xl-4 lg-4 md-4 sm-6`}
                  id="gallery-main-images"
                >
                  <div className="gallery-inner-images">
                    <img src={`/assets/upload/gallery/${image?.gallery_image}`} alt={image?.gallery_title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Images;
