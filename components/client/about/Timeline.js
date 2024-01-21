import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import $ from "jquery";

const Timeline = () => {
  useEffect(() => {
    $(".step").click(function () {
      $(this).addClass("active").prevAll().addClass("active");
      $(this).nextAll().removeClass("active");
    });

    $(".step01").click(function () {
      $("#line-progress").css("width", "3%");
      $(".discovery").addClass("active").siblings().removeClass("active");
    });

    $(".step02").click(function () {
      $("#line-progress").css("width", "25%");
      $(".strategy").addClass("active").siblings().removeClass("active");
    });

    $(".step03").click(function () {
      $("#line-progress").css("width", "50%");
      $(".creative").addClass("active").siblings().removeClass("active");
    });

    $(".step04").click(function () {
      $("#line-progress").css("width", "75%");
      $(".production").addClass("active").siblings().removeClass("active");
    });

    $(".step05").click(function () {
      $("#line-progress").css("width", "100%");
      $(".analysis").addClass("active").siblings().removeClass("active");
    });
  }, []);

  return (
    <>
      <section className="timeline-sec">
        <div className="container-timeline">
          <div className="timeline-inner">
            <h5>Our Core Values</h5>
            <p>
              our Mission is to be Leading Proactive Company by servicing our
              customers with Quality Waterproofing Solutions through constant
              growth in
            </p>
            <div className="grid mt-14">
              <div className="xl-3 lg-3 md-6 sm-6">
                <div className="timeline-content">
                  <h6>KNOWLEDGE</h6>
                  <img src={"/assets/images/client/Line.svg"} />
                  <p>
                    we Started in 2008 with small application company now in
                    2015 we have 2 unit & have developed ourselves as an pure
                    manufacturing company in the field of specialized,
                    sustainable coating company Thats we call a constant
                    knowledge up gradation
                  </p>
                </div>
              </div>
              <div className="xl-3 lg-3 md-6 sm-6">
                <div className="timeline-content">
                  <h6>SKILL</h6>
                  <img src={"/assets/images/client/Line.svg"} />
                  <p>
                    We specialize in safeguarding your home with expert roofing
                    solutions. From installations to repairs, trust us for a
                    secure and enduring roof.
                  </p>
                </div>
              </div>
              <div className="xl-3 lg-3 md-6 sm-6">
                <div className="timeline-content">
                  <h6>TRAINING</h6>
                  <img src={"/assets/images/client/Line.svg"} />
                  <p>
                    We specialize in safeguarding your home with expert roofing
                    solutions. From installations to repairs, trust us for a
                    secure and enduring roof.
                  </p>
                </div>
              </div>
              <div className="xl-3 lg-3 md-6 sm-6">
                <div className="timeline-content">
                  <h6>INNOVATIONS</h6>
                  <img src={"/assets/images/client/Line.svg"} />
                  <p>
                    We understand that Innovation is crucial when it comes to
                    staying ahead of the curve. Hence we attempt to continuously
                    innovate all our processes as this is what will make us
                    truly world-class.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="process-wrapper">
          <div id="progress-bar-container">
            <ul>
              <li class="step step01 active">
                <div class="step-inner">27 Jan</div>
              </li>
              <li class="step step02">
                <div class="step-inner"> 21 Feb</div>
              </li>
              <li class="step step03">
                <div class="step-inner"> 08 May</div>
              </li>
              <li class="step step04">
                <div class="step-inner">19 Jun</div>
              </li>
              <li class="step step05">
                <div class="step-inner">29 Aug</div>
              </li>
            </ul>

            <div id="line">
              <div id="line-progress"></div>
            </div>
          </div>

          <div id="progress-content-section">
            <div class="section-content discovery active">
              <p>
                We believe that every project is unique and hence has its own
                specific requirements. AWC products and services reflect this
                uniqueness and are hence customized to suit specific client
                requirements. The popularity of our waterproof roof coatings,
                waterproof wall coatings and ceiling waterproofing solutions
                makes us one of the leading waterproofing companies in India.
              </p>
            </div>

            <div class="section-content strategy">
              <p>
                AWC is known as the leading waterproofing company with excellent
                customer service which also makes us one of the preferred
                waterproofing contractors in Mumbai. Our ability to retain
                customers helps us get our new customers. In fact, majority of
                our new customers are referred by our existing customers making
                us an exterior wall waterproofing expert!
              </p>
            </div>

            <div class="section-content creative">
              <p>
                As a waterproofing company and as the maker of cool roof coating
                products, AWC believes that our responsibility is not
                waterproofing alone, but to contribute towards improving the
                energy efficiency of the structure too. AWC products are
                designed to reflect the sun’s heat energy falling on the
                structure.
              </p>
            </div>

            <div class="section-content production">
              <p>
                We believe that our responsibility does not end by being one of
                the best roof waterproofing company or by providing top quality
                terrace waterproofing solutions alone, but includes providing
                energy efficient interiors, encouraging recycling, minimizing
                and/or scientific disposal of wastes too.
              </p>
            </div>

            <div class="section-content analysis">
              <p>
                We believe that our applicators are our real brand ambassadors.
                Caring for them and upgrading their knowledge levels had made us
                the leading waterproofing contractor in Mumbai. As a roof
                waterproofing, terrace waterproofing and external waterproofing
                expert, we are committed to undertake regular training sessions
                to up skill them and familiarize them with the latest in the
                field of waterproofing roof coatings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
