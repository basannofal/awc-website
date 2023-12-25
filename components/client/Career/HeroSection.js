import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="blog-view-sec">
        <div className="container mb-8">
          <p className="career-title">Career Opportunities with AWC</p>
          <p className="career-desc">
            Voices of Satisfaction AWC Waterproofing's Success Stories Dive into
            satisfaction with AWC Waterproofing - where expertise meets
            excellence, keeping your spaces dry and customers smiling. Get Free
            Quote Now
          </p>
          <div className="btn-sec mt-5">
            <button
              className="btn-primary learn-btn"
              style={{ padding: "0px 30px" }}
            >
              apply now
            </button>{" "}
            <button
              className="btn-primary learn-btn lg:ms-4 md:ms-4 lg:mt-0 md:mt-0 mt-3"
              style={{ padding: "0px 30px" }}
            >
              email your resume
            </button>
          </div>

          <div className="career_card mt-10">
            <div className="career_card_right_sec">
              <p className="card_heading">sales person</p>
              <p className="card_desc">
                Voices of Satisfaction AWC Waterproofing's Success Stories Dive
                into satisfaction with AWC Waterproofing – where expertise meets
                excellence, keeping your spaces dry and customers smiling. Get
                Free Quote Now
              </p>
              <div className="md:flex sm:flex mt-3">
                <p className="card_right_btn">Marketing</p>
                <p className="card_right_btn md:ms-10 sm:ms-10n ms-0">
                  2 Opening | Full Time
                </p>
              </div>
            </div>
            <div className="career_card_left_sec">
              <button
                className="btn-primary learn-btn ms-4"
                style={{ padding: "0px 30px" }}
              >
                apply now
              </button>
            </div>
          </div>
          <div className="career_card mt-10">
            <div className="career_card_right_sec">
              <p className="card_heading">sales person</p>
              <p className="card_desc">
                Voices of Satisfaction AWC Waterproofing's Success Stories Dive
                into satisfaction with AWC Waterproofing – where expertise meets
                excellence, keeping your spaces dry and customers smiling. Get
                Free Quote Now
              </p>
              <div className="md:flex sm:flex mt-3">
                <p className="card_right_btn">Marketing</p>
                <p className="card_right_btn md:ms-10 sm:ms-10n ms-0">
                  2 Opening | Full Time
                </p>
              </div>
            </div>
            <div className="career_card_left_sec">
              <button
                className="btn-primary learn-btn ms-4"
                style={{ padding: "0px 30px" }}
              >
                apply now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
