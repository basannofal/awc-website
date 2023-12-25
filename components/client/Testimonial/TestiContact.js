import axios from "axios";
import React, { useEffect, useState } from "react";

const TestiContact = () => {
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState([]);

  const getTestimonial = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/testimonials/router`
      );
      console.log(response.data);
      setTestimonial(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTestimonial();
    };
    fetchData();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <img
          key={`star-${i}`}
          src="/assets/images/client/rating-icon.png"
          alt="Rating Icon"
          width="12"
          height="auto"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <img
          key="half-star"
          src="/assets/images/client/half-rating-icon.png" // Replace with your half-star image
          alt="Half Rating Icon"
          width="12"
          height="auto"
        />
      );
    }

    return stars;
  };

  return (
    <>
     {loading ? <h1>Loading</h1>:
         <div className="main_testi_contact">
        {testimonial.map((item, idx) => {
          return (
            <div className="main_testi_contact_inner">
              <div className="testimonials-contents">
                <img
                  className=""
                  src={"./assets/images/client/quotes-img.png"}
                  alt="Double Quotes Image"
                  width="22"
                  height="auto"
                />
                <p
                  className="contact_desc mt-4"
                  dangerouslySetInnerHTML={{
                    __html: item?.testimonial_desc,
                  }}
                ></p>
                <div className="testi_contact_review mt-4">
                  <img
                    style={{ borderRadius: "50%" }}
                    src={`/assets/upload/testimonial/${item?.testimonial_image}`}
                    alt="Client Image"
                    width="50"
                    height="auto"
                  />
                  <div className="testi_contact_title ms-2">
                    <h4>{item?.testimonial_title}</h4>
                    <div className="testi_rating">
                      {renderStars(item?.rating)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="video_testimonial">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/your-video-id"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                <p className="testi_video_title">
                  Mr SG Bapat EX Chief Engineer Nuclear Power Corporation of
                  India
                </p>
              </div>
            </div>
          );
        })}
      </div>}
    </>
  );
};

export default TestiContact;
