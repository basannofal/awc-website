import axios from "axios";
import React, { useEffect, useState } from "react";

const HeroSection = ({ setJobId, scrollToForm }) => {
  const [loading, setLoading] = useState(true);
  const [careerData, setCareerData] = useState([]);

  const getSEOData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/career/alljobs/router`
      );
      setLoading(false);
      console.log(response.data);
      setCareerData(response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleApplyNow = (jobId) => {
    setJobId(jobId);
    scrollToForm(); // Scroll to the form when "apply now" is clicked
  };


  useEffect(() => {
    const fetchData = async () => {
      await getSEOData();
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="testi_hero_main">
        <div className="containeres">
          <div className="blog-view-sec">
            <div className="container mb-8">
              <p className="career-title">Career Opportunities with AWC</p>
              <p className="career-desc">
                Voices of Satisfaction AWC Waterproofing's Success Stories Dive
                into satisfaction with AWC Waterproofing - where expertise meets
                excellence, keeping your spaces dry and customers smiling. Get
                Free Quote Now
              </p>
              <div className="btn-sec mt-5">
                <button
                  className="btn-primary learn-btn"
                  style={{ padding: "0px 30px" }}
                  onClick={() => scrollToForm()}
                >
                  apply now
                </button>{" "}
                <button
                  className="btn-primary learn-btn lg:ms-4 md:ms-4 lg:mt-0 md:mt-0 mt-3"
                  style={{ padding: "0px 30px" }}
                  onClick={() => scrollToForm()}
                >
                  email your resume
                </button>
              </div>

              <div className="career_container">
                {careerData.map((item, idx) => {
                  return (
                    <div className="career_card mt-10" key={item.id}>
                      <div className="career_card_right_sec">
                        <p className="card_heading">{item.role_name}</p>
                        <p className="card_desc">{item.job_desc}</p>
                        <div className="md:flex sm:flex mt-3">
                          <p className="card_right_btn">{item.category}</p>
                          <p className="card_right_btn md:ms-10 sm:ms-10n ms-0">
                            {item.nop} Opening | {item.duration}
                          </p>
                        </div>
                      </div>
                      <div className="career_card_left_sec">
                        <button
                          className="btn-primary learn-btn "
                          style={{ padding: "0px 30px" }}
                          onClick={() => handleApplyNow(item.id)}
                        >
                          apply now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
