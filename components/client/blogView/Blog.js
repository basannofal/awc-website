import React from "react";

const Blog = () => {
  return (
    <>
      <section className="blog-view-sec">
        <div className="container">
          <p className="blog-view-main-title">
            blogs <i className="fa-solid fa-angles-right"></i>
            <i className="fa-solid fa-angles-right"></i> wall section{" "}
            <i className="fa-solid fa-angles-right"></i>
            <i className="fa-solid fa-angles-right"></i> external wall
            waterproofing - reason for failure & best solution
          </p>

          <div className="blog_view_image">
            <img
              src={"./assets/images/client/blogViewImg.png"}
              alt="lbog_view_image"
            />
          </div>

          <div className="blog_view_content_sec">
            <div className="blog_content">
              <div className="blog_date_section">
                <p>
                  <i className="fa-solid fa-calendar-days"></i> january 2023
                </p>
                <p>
                  <i className="fa-solid fa-clock"></i> 2:00 PM
                </p>
              </div>
              <div className="blog_title">
                <p className="heading">
                  External Wall Waterproofing – Reasons for failure & best
                  solutions
                </p>
                <p className="blog_desc">ccsdcsd</p>
              </div>
            </div>
            <div className="side_section">
              <div className="side_sec_card">
                <p className="card_heading mb-4">Related Articles</p>
                <div className="article">
                  <div className="article_icon">
                    <img
                      src={"./assets/images/client/client-img-1.png"}
                      alt=""
                    />
                  </div>
                  <div className="article_data">
                    <p className="heading mb-1">Article Post-1</p>
                    <p className="desc">
                      University of Michigan freshman & Author of A Tangled Web
                    </p>
                  </div>
                </div>
                <hr
                  style={{
                    marginBottom: "20px",
                    height: "1.6px",
                    backgroundColor: "gray",
                  }}
                />
                <div className="article">
                  <div className="article_icon">
                    <img
                      src={"./assets/images/client/client-img-1.png"}
                      alt=""
                    />
                  </div>
                  <div className="article_data">
                    <p className="heading mb-1">Article Post-1</p>
                    <p className="desc">
                      University of Michigan freshman & Author of A Tangled Web
                    </p>
                  </div>
                </div>
              </div>
              <div className="side_sec_card">
                <p className="card_heading mb-3">Share With Your Friend</p>
                <div className="share_main_section">
                  <div className="icon_title">
                    <i className="fa-brands fa-facebook-f"></i>
                    <p>Share On Facebook</p>
                  </div>
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
                <div className="share_main_section">
                  <div className="icon_title">
                    <i className="fa-brands fa-x-twitter"></i>
                    <p>Share On Twitter</p>
                  </div>
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
                <div className="share_main_section">
                  <div className="icon_title">
                    <i className="fa-brands fa-whatsapp"></i>
                    <p>Share On Whatsapp</p>
                  </div>
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
                <div className="share_main_section">
                  <div className="icon_title">
                    <i className="fa-brands fa-linkedin-in"></i>
                    <p>Share On Linkedin</p>
                  </div>
                  <div className="arrow">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
