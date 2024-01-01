import axios from "axios";
import React, { useEffect, useState } from "react";

const Images = ({ selectedCategory }) => {
  const [loading, setLoading] = useState(true);
  const [galleryPhoto, setGalleryPhoto] = useState([]);

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
          {loading ? (
            <div className="gallery-image-main-inner">
              <div className="grid">
                <div
                  role="status"
                  className="xl-4 lg-4 md-4 sm-6 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                  id="gallery-main-images"
                >
                  <div className="gallery-inner-images">
                    <img src={`/assets/upload/gallery/${image?.gallery_image}`} alt={image?.gallery_title} />

                  </div>
                </div>
                <div
                  role="status"
                  className="xl-4 lg-4 md-4 sm-6 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                  id="gallery-main-images"
                >
                  <div className="flex items-center justify-center h-56 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
                <div
                  role="status"
                  className="xl-4 lg-4 md-4 sm-6 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                  id="gallery-main-images"
                >
                  <div className="flex items-center justify-center h-56 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="gallery-image-main-inner">
              <div className="grid">
                {galleryPhoto.map((image, index) => (
                  <div
                    key={index}
                    className={`xl-4 lg-4 md-4 sm-6`}
                    id="gallery-main-images"
                  >
                    <div className="gallery-inner-images">
                      <img
                        src={`/assets/upload/gallery/${image?.gallery_image}`}
                        alt={image?.gallery_title}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Images;
