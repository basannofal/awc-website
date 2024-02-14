import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="main-sec">
        <div className="container">
          <div className="main-inner">
            <p className="sub-title">Your Trusted Partner in Waterproofing</p>
            <h1 className="main-title" id="home-title-animation">
              Simplifying Waterproofing Solutions
            </h1>
            <p className="desc">
              Discover innovative solutions that protect surfaces against leaks
              and enhance longevity. Join us in elevating waterproofing
              standards.
            </p>
            <Link href="/contact" className="btn-primary">
              Get Free Quote Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
