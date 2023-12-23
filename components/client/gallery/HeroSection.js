import Link from "next/link";
import React from "react";

const HeroSection = () => {
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
            <div className="gallery-btn-sec">
              <Link href="/" className="btn-primary gallery-btn1">
                Roof Water Proofing
              </Link>
              <Link href="/" className="btn-primary gallery-btn2">
                External Wall Proofing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
