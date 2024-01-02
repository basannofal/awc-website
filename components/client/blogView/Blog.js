import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Blog = ({ bid }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState("");

  const getBlogData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/blogview/${bid}`
      );
      console.log(response.data);
      setBlog(response.data[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await getBlogData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="testi_hero_main">
        <div
          className="containeres"
          style={{
            padding: "170px 0px 50px 0px",
          }}
        >
          <div className="blog-view-sec">
            <p className="blog-view-main-title">
              <Link href={"/blogs"}>blogs</Link>
              <i className="fa-solid fa-angles-right"></i>
              <i className="fa-solid fa-angles-right"></i>{" "}
              {blog?.category_title}{" "}
              <i className="fa-solid fa-angles-right"></i>
              <i className="fa-solid fa-angles-right"></i> {blog?.blog_title}
            </p>

            <div className="blog_view_image">
              <img
                src={"/assets/images/client/blogViewImg.png"}
                alt="lbog_view_image"
              />
            </div>
            <div className="blog_view_content_sec">
              <div className="blog_content">
                <div className="blog_date_section">
                  <p>
                    <i className="fa-solid fa-calendar-days"></i> {blog?.published_date?.substring(0,10)}
                  </p>
                  {/* <p>
                    <i className="fa-solid fa-clock"></i> 2:00 PM
                  </p> */}
                </div>
                <div className="blog_title">
                  <p className="heading">{blog?.blog_title}</p>
                  <p
                    className="blog_desc"
                    dangerouslySetInnerHTML={{ __html: blog?.blog_description }}
                  ></p>
                </div>
              </div>
              <div className="side_section">
                <div className="side_sec_card">
                  <p className="card_heading mb-4">Related Articles</p>
                  <div className="article">
                    <div className="article_icon">
                      <img
                        src={"/assets/images/client/client-img-1.png"}
                        alt=""
                      />
                    </div>
                    <div className="article_data">
                      <p className="heading mb-1">Article Post-1</p>
                      <p className="desc">
                        University of Michigan freshman & Author of A Tangled
                        Web
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
                        src={"/assets/images/client/client-img-1.png"}
                        alt=""
                      />
                    </div>
                    <div className="article_data">
                      <p className="heading mb-1">Article Post-1</p>
                      <p className="desc">
                        University of Michigan freshman & Author of A Tangled
                        Web
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
            <div className="container mt-5">
              <p className="related_heading">
                <span>Re</span>lated Articles
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="containers">
          <div className="main_blogs">
            <div className="flex flex-wrap justify-center">
              <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section">
                <img src={"/assets/images/client/blog-1.png"} alt="" />
                <div className="blog_name_main_section">
                  <div className="blog_name_section">AWC India</div>
                  <div className="blog_rectangle"></div>
                  <div className="blog_name_section">2023-12-15</div>
                </div>
                <p className="blog_desc_section">
                  Unlocking the Secrets of Effective Roof Waterproofing
                </p>
                <p className="blog_sec_desc_section">
                  Discover the key strategies and expert insights for achieving
                  long-lasting roof waterproofing solutions.
                </p>
              </div>
              <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section">
                <img src={"/assets/images/client/blog-1.png"} alt="" />
                <div className="blog_name_main_section">
                  <div className="blog_name_section">AWC India</div>
                  <div className="blog_rectangle"></div>
                  <div className="blog_name_section">2023-12-15</div>
                </div>
                <p className="blog_desc_section">
                  Unlocking the Secrets of Effective Roof Waterproofing
                </p>
                <p className="blog_sec_desc_section">
                  Discover the key strategies and expert insights for achieving
                  long-lasting roof waterproofing solutions.
                </p>
              </div>
              <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section">
                <img src={"/assets/images/client/blog-1.png"} alt="" />
                <div className="blog_name_main_section">
                  <div className="blog_name_section">AWC India</div>
                  <div className="blog_rectangle"></div>
                  <div className="blog_name_section">2023-12-15</div>
                </div>
                <p className="blog_desc_section">
                  Unlocking the Secrets of Effective Roof Waterproofing
                </p>
                <p className="blog_sec_desc_section">
                  Discover the key strategies and expert insights for achieving
                  long-lasting roof waterproofing solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
