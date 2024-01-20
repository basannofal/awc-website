import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/home/home-product-data/router`
      );
      const data = response.data;

      const categories = {};

      data.forEach((item) => {
        if (!categories[item.category_id]) {
          const productItem = {
            product_id: item.product_id,
            product_title: item.product_title,
          };

          categories[item.category_id] = {
            category_id: item.category_id,
            category_name: item.category_name,
            products: [productItem],
          };
        } else {
          const productItem = {
            product_id: item.product_id,
            product_title: item.product_title,
          };
          categories[item.category_id].products.push(productItem);
        }
      });

      const categoryArray = Object.values(categories);
      setProductCategories(categoryArray);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getSocialLinksData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/social-links/router`
      );
      setLoading(false);
      setSocialLinks(response.data[0]);
    } catch (error) {
      setLoading(false);
    }
  };

  const getSEOData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/setting/router`
      );
      setLoading(false);
      setSeoData(response.data[0]);
      console.log(response.data[0]);
      console.log("response.data[0]");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    await getSEOData();
  };

  useEffect(() => {
    const isHardReload = !window.performance.navigation.type;
    if (isHardReload) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    getData();
    getSEOData();
    getSocialLinksData();
  }, []);

  return (
    <>
      <section className="get-started-sec">
        <div className="container">
          <div className="get-started-inner">
            <h4>
              Experience top-quality waterproofing solutions <br /> that stand
              the test of time. Contact us today to get started.
            </h4>
            <div className="btn-sec">
              <Link href="/" className="btn-primary learn-btn">
                Learn More
              </Link>
              <Link href="/" className="btn-primary cnt-btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <section className="grid footer-info">
            <div className="xl-4 lg-4 sm-6 footer-logo-sec">
              <Link href="/" className="footer-logo-link">
                {seoData && seoData.logo ? (
                  <img
                    src={`/assets/upload/setting/${seoData.logo}`}
                    alt="AWC Footer Logo"
                    width="100%"
                    height="auto"
                    className="footer-logo"
                  />
                ) : (
                  <img
                    src={"/assets/images/client/awc_logo_header.webp"}
                    alt="AWC Footer Logo"
                    width="100%"
                    height="auto"
                    className="footer-logo"
                  />
                )}
              </Link>
              <p className="text-justify">
                Discover innovative solutions that protect surfaces against
                leaks and enhance longevity. Join us in elevating waterproofing
                standards.
              </p>
              <div className="social-sec">
                <ul>
                  <li>
                    {socialLinks && socialLinks.facebook_link ? (
                      <Link href={socialLinks.facebook_link} target="_blank">
                        <svg
                          width="10"
                          height="18"
                          viewBox="0 0 10 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="https://www.facebook.com/awcindia.in/"
                        target="_blank"
                      >
                        <svg
                          width="10"
                          height="18"
                          viewBox="0 0 10 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    )}
                  </li>
                  <li>
                    {socialLinks && socialLinks.twiter_link ? (
                      <Link href={socialLinks.twiter_link} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="18"
                          viewBox="0 0 512 512"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_84_15698)">
                            <rect width="512" height="512" rx="60"></rect>
                            <path
                              fill="#000"
                              d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_84_15698">
                              <rect width="512" height="512" fill="#fff"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="https://twitter.com/awc_india"
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="18"
                          viewBox="0 0 512 512"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_84_15698)">
                            <rect width="512" height="512" rx="60"></rect>
                            <path
                              fill="#000"
                              d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_84_15698">
                              <rect width="512" height="512" fill="#fff"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    )}
                  </li>
                  <li>
                    {socialLinks && socialLinks.youtube_link ? (
                      <Link href={socialLinks.youtube_link} target="_blank">
                        <svg
                          width="18"
                          height="13"
                          viewBox="0 0 18 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.6239 1.98027C17.4169 1.20079 16.8069 0.5869 16.0325 0.378566C14.6288 0 9 0 9 0C9 0 3.37127 0 1.96752 0.378566C1.19308 0.586933 0.583143 1.20079 0.376127 1.98027C0 3.39312 0 6.3409 0 6.3409C0 6.3409 0 9.28868 0.376127 10.7015C0.583143 11.481 1.19308 12.0693 1.96752 12.2777C3.37127 12.6562 9 12.6562 9 12.6562C9 12.6562 14.6287 12.6562 16.0325 12.2777C16.8069 12.0693 17.4169 11.481 17.6239 10.7015C18 9.28868 18 6.3409 18 6.3409C18 6.3409 18 3.39312 17.6239 1.98027ZM7.15908 9.01727V3.66454L11.8636 6.34097L7.15908 9.01727Z"
                            fill="#07070A"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="https://www.youtube.com/channel/UCoNJRSh7tkbDHmF8GoOi4fw"
                        target="_blank"
                      >
                        <svg
                          width="18"
                          height="13"
                          viewBox="0 0 18 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.6239 1.98027C17.4169 1.20079 16.8069 0.5869 16.0325 0.378566C14.6288 0 9 0 9 0C9 0 3.37127 0 1.96752 0.378566C1.19308 0.586933 0.583143 1.20079 0.376127 1.98027C0 3.39312 0 6.3409 0 6.3409C0 6.3409 0 9.28868 0.376127 10.7015C0.583143 11.481 1.19308 12.0693 1.96752 12.2777C3.37127 12.6562 9 12.6562 9 12.6562C9 12.6562 14.6287 12.6562 16.0325 12.2777C16.8069 12.0693 17.4169 11.481 17.6239 10.7015C18 9.28868 18 6.3409 18 6.3409C18 6.3409 18 3.39312 17.6239 1.98027ZM7.15908 9.01727V3.66454L11.8636 6.34097L7.15908 9.01727Z"
                            fill="#07070A"
                          />
                        </svg>
                      </Link>
                    )}
                  </li>
                  <li>
                    {socialLinks && socialLinks.linkedin_link ? (
                      <Link href={socialLinks.linkedin_link} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="13"
                          viewBox="0 5 1036 990"
                        >
                          <path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"></path>
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="https://www.linkedin.com/in/awc-india-36ab76a8/"
                        target="_blank"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="13"
                          viewBox="0 5 1036 990"
                        >
                          <path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"></path>
                        </svg>
                      </Link>
                    )}
                  </li>
                  {/* <li>
                    {socialLinks && socialLinks.whatsapp_link ? (
                      <Link href={socialLinks.whatsapp_link} target="_blank">
                        <svg
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.35713 0C3.65692 0 0 2.4668 0 6.45913C0 8.99806 1.42815 10.4406 2.29369 10.4406C2.65073 10.4406 2.8563 9.44526 2.8563 9.16395C2.8563 8.82856 2.00157 8.11448 2.00157 6.71879C2.00157 3.81922 4.20871 1.76355 7.065 1.76355C9.52099 1.76355 11.3386 3.15924 11.3386 5.72341C11.3386 7.63843 10.5705 11.2304 8.08202 11.2304C7.18402 11.2304 6.41585 10.5813 6.41585 9.65082C6.41585 8.28759 7.36795 6.96763 7.36795 5.56112C7.36795 3.17366 3.9815 3.60644 3.9815 6.49158C3.9815 7.09747 4.05724 7.76826 4.32772 8.32005C3.83003 10.4623 2.81302 13.654 2.81302 15.8611C2.81302 16.5427 2.91039 17.2135 2.97531 17.8951C3.09793 18.0322 3.03662 18.0178 3.22415 17.9492C5.0418 15.4608 4.97688 14.9739 5.79915 11.7173C6.24274 12.5612 7.38958 13.0156 8.29841 13.0156C12.1284 13.0156 13.8487 9.28297 13.8487 5.91816C13.8487 2.33697 10.7544 0 7.35713 0Z"
                            fill="#07070A"
                          />
                        </svg>
                      </Link>
                    ) : (
                      <Link
                        href="https://br.pinterest.com/orderid343221/"
                        target="_blank"
                      >
                        <svg
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.35713 0C3.65692 0 0 2.4668 0 6.45913C0 8.99806 1.42815 10.4406 2.29369 10.4406C2.65073 10.4406 2.8563 9.44526 2.8563 9.16395C2.8563 8.82856 2.00157 8.11448 2.00157 6.71879C2.00157 3.81922 4.20871 1.76355 7.065 1.76355C9.52099 1.76355 11.3386 3.15924 11.3386 5.72341C11.3386 7.63843 10.5705 11.2304 8.08202 11.2304C7.18402 11.2304 6.41585 10.5813 6.41585 9.65082C6.41585 8.28759 7.36795 6.96763 7.36795 5.56112C7.36795 3.17366 3.9815 3.60644 3.9815 6.49158C3.9815 7.09747 4.05724 7.76826 4.32772 8.32005C3.83003 10.4623 2.81302 13.654 2.81302 15.8611C2.81302 16.5427 2.91039 17.2135 2.97531 17.8951C3.09793 18.0322 3.03662 18.0178 3.22415 17.9492C5.0418 15.4608 4.97688 14.9739 5.79915 11.7173C6.24274 12.5612 7.38958 13.0156 8.29841 13.0156C12.1284 13.0156 13.8487 9.28297 13.8487 5.91816C13.8487 2.33697 10.7544 0 7.35713 0Z"
                            fill="#07070A"
                          />
                        </svg>
                      </Link>
                    )}
                  </li> */}
                             
                </ul>
              </div>
            </div>
            <div className="xl-2 lg-4 sm-6 navigation-sec">
              <h4 className="footer-info-heading">Navigations</h4>
              <ul className="list-items">
                <li className="list-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="list-item">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="list-item">
                  <Link href="/product">Products</Link>
                </li>
                <li className="list-item">
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li className="list-item">
                  <Link href="/career">Career</Link>
                </li>
                <li className="list-item">
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li className="list-item">
                  <Link href="/blogs">Blogs</Link>
                </li>
                <li className="list-item">
                  <Link href="/testimonials">Testimonials</Link>
                </li>
              </ul>
            </div>
            <div className=" xl-2 lg-4 sm-6 our-products-sec">
              <h4 className="footer-info-heading">Our Products</h4>
              {productCategories.map((category) => (
                <div key={category.category_id} className="our-sub-cat">
                  <h5>{category.category_name}</h5>
                  <ul className="list-items">
                    {category.products.map((product) => {
                      const slug = product.product_title.replace(/\s+/g, "-");
                      return (
                        <li key={product.product_id} className="list-item">
                          <Link href={`/product/${slug}/${product.product_id}`}>
                            {product.product_title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="xl-4 lg-12 sm-6 contact-footer">
              <h4 className="footer-info-heading">Contact Us</h4>
              <div className="contact-info">
                <h5>AWC Lean Manufacturing Unit</h5>
                <p>
                  Survey/Plot No:-662 Village:- Tembhi Taluka:- Umbergaon,Dist
                  -Valsad,Umargam, Gujarat 396150
                </p>
              </div>
              <div className="contact-info">
                <h5>Head Office</h5>
                <p>
                  A- 10/11, 4th Floor, Yojana CHS. Ltd, S.V Road, Malad (W),
                  Mumbai- 400 064.
                </p>
              </div>
              <div className="contact-info">
                <p>
                  <b>Mobile: </b>
                  {seoData && seoData.number ? (
                    <Link href={`tel:+91${seoData?.number}`}>
                      {seoData?.number
                        ? `+91 ${seoData.number.slice(
                            0,
                            2
                          )} ${seoData.number.slice(
                            2,
                            4
                          )} ${seoData.number.slice(
                            4,
                            6
                          )} ${seoData.number.slice(6)}`
                        : ""}
                    </Link>
                  ) : (
                    <Link href="tel:+918686862475">+91 868686 2475</Link>
                  )}
                </p>
                <p>
                  <b>E-mail: </b>
                  {seoData && seoData.email ? (
                    <Link href={`mailto:${seoData?.email}`}>
                      {seoData?.email}
                    </Link>
                  ) : (
                    <Link href="mailto:info@awcindia.in">
                      info@awcindia.in / india.awc@gmail.com
                    </Link>
                  )}
                </p>
                <p>
                  <b>Website: </b>
                  <Link href="https://awcindia.in/">www.awcindia.in</Link>
                </p>
              </div>
              <div className="contact-info map-info">
                <p>
                  <Link href="https://g.page/awcindia-in?share">
                    Click here to view the map
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>
        <div className="copyright-footer">
          <div className="container">
            <p>Copyright © 2023 AWC. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
