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
                  <img src={"/assets/images/client/line.svg"} />
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
                  <img src={"/assets/images/client/line.svg"} />
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
                  <img src={"/assets/images/client/line.svg"} />
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
                  <img src={"/assets/images/client/line.svg"} />
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
              <h2>HOME SECTION</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                neque justo, consequat non fermentum ac, tempor eu turpis. Proin
                nulla eros, placerat non ipsum ut, dapibus ullamcorper ex. Nulla
                in dapibus lorem. Suspendisse vitae velit ac ante consequat
                placerat ut sed eros. Nullam porttitor mattis mi, id fringilla
                ex consequat eu. Praesent pulvinar tincidunt leo et condimentum.
                Maecenas volutpat turpis at felis egestas malesuada. Phasellus
                sem odio, venenatis at ex a, lacinia suscipit orci.
              </p>
            </div>

            <div class="section-content strategy">
              <h2>GALLERY SECTION</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                neque justo, consequat non fermentum ac, tempor eu turpis. Proin
                nulla eros, placerat non ipsum ut, dapibus ullamcorper ex. Nulla
                in dapibus lorem. Suspendisse vitae velit ac ante consequat
                placerat ut sed eros. Nullam porttitor mattis mi, id fringilla
                ex consequat eu. Praesent pulvinar tincidunt leo et condimentum.
                Maecenas volutpat turpis at felis egestas malesuada. Phasellus
                sem odio, venenatis at ex a, lacinia suscipit orci.
              </p>
            </div>

            <div class="section-content creative">
              <h2>Creative CREATIONS</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                neque justo, consequat non fermentum ac, tempor eu turpis. Proin
                nulla eros, placerat non ipsum ut, dapibus ullamcorper ex. Nulla
                in dapibus lorem. Suspendisse vitae velit ac ante consequat
                placerat ut sed eros. Nullam porttitor mattis mi, id fringilla
                ex consequat eu. Praesent pulvinar tincidunt leo et condimentum.
                Maecenas volutpat turpis at felis egestas malesuada. Phasellus
                sem odio, venenatis at ex a, lacinia suscipit orci.
              </p>
            </div>

            <div class="section-content production">
              <h2>TESTIMONIALS NOW</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                neque justo, consequat non fermentum ac, tempor eu turpis. Proin
                nulla eros, placerat non ipsum ut, dapibus ullamcorper ex. Nulla
                in dapibus lorem. Suspendisse vitae velit ac ante consequat
                placerat ut sed eros. Nullam porttitor mattis mi, id fringilla
                ex consequat eu. Praesent pulvinar tincidunt leo et condimentum.
                Maecenas volutpat turpis at felis egestas malesuada. Phasellus
                sem odio, venenatis at ex a, lacinia suscipit orci.
              </p>
            </div>

            <div class="section-content analysis">
              <h2>OUR LOCATIONS</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                neque justo, consequat non fermentum ac, tempor eu turpis. Proin
                nulla eros, placerat non ipsum ut, dapibus ullamcorper ex. Nulla
                in dapibus lorem. Suspendisse vitae velit ac ante consequat
                placerat ut sed eros. Nullam porttitor mattis mi, id fringilla
                ex consequat eu. Praesent pulvinar tincidunt leo et condimentum.
                Maecenas volutpat turpis at felis egestas malesuada. Phasellus
                sem odio, venenatis at ex a, lacinia suscipit orci.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
