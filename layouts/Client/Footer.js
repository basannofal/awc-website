import React from "react";
import Link from "next/link";

const Footer = () => {
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
                <img src={"./assets/images/client/awc_logo_1.webp"} alt="Footer Logo" />
              </Link>
              <p>
                Discover innovative solutions that protect surfaces against
                leaks and enhance longevity. Join us in elevating waterproofing
                standards.
              </p>
              <div className="social-sec">
                <ul>
                  <li>
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
                  </li>
                  <li>
                    <Link href="/">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.00201 4.38405C6.44808 4.38405 4.38806 6.44406 4.38806 8.99799C4.38806 11.5519 6.44808 13.6119 9.00201 13.6119C11.5559 13.6119 13.616 11.5519 13.616 8.99799C13.616 6.44406 11.5559 4.38405 9.00201 4.38405ZM9.00201 11.9977C7.35159 11.9977 6.00234 10.6524 6.00234 8.99799C6.00234 7.34356 7.34757 5.99833 9.00201 5.99833C10.6564 5.99833 12.0017 7.34356 12.0017 8.99799C12.0017 10.6524 10.6524 11.9977 9.00201 11.9977ZM14.8809 4.19531C14.8809 4.79364 14.399 5.2715 13.8047 5.2715C13.2064 5.2715 12.7285 4.78963 12.7285 4.19531C12.7285 3.601 13.2104 3.11913 13.8047 3.11913C14.399 3.11913 14.8809 3.601 14.8809 4.19531ZM17.9368 5.28756C17.8685 3.84596 17.5392 2.56899 16.4831 1.5169C15.431 0.464807 14.154 0.135527 12.7124 0.063246C11.2267 -0.021082 6.77334 -0.021082 5.28756 0.063246C3.84997 0.131511 2.57301 0.460792 1.5169 1.51288C0.460792 2.56498 0.135527 3.84194 0.063246 5.28355C-0.021082 6.76933 -0.021082 11.2226 0.063246 12.7084C0.131511 14.15 0.460792 15.427 1.5169 16.4791C2.57301 17.5312 3.84596 17.8605 5.28756 17.9327C6.77334 18.0171 11.2267 18.0171 12.7124 17.9327C14.154 17.8645 15.431 17.5352 16.4831 16.4791C17.5352 15.427 17.8645 14.15 17.9368 12.7084C18.0211 11.2226 18.0211 6.77334 17.9368 5.28756ZM16.0173 14.3026C15.7041 15.0897 15.0977 15.696 14.3066 16.0133C13.122 16.4831 10.3111 16.3747 9.00201 16.3747C7.69292 16.3747 4.87797 16.4791 3.69738 16.0133C2.91032 15.7001 2.30396 15.0937 1.98673 14.3026C1.5169 13.118 1.62532 10.3071 1.62532 8.99799C1.62532 7.6889 1.52091 4.87395 1.98673 3.69336C2.29994 2.9063 2.9063 2.29994 3.69738 1.98271C4.88199 1.51288 7.69292 1.6213 9.00201 1.6213C10.3111 1.6213 13.126 1.5169 14.3066 1.98271C15.0937 2.29593 15.7001 2.90229 16.0173 3.69336C16.4871 4.87797 16.3787 7.6889 16.3787 8.99799C16.3787 10.3071 16.4871 13.122 16.0173 14.3026Z"
                          fill="#07070A"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
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
                  </li>
                  <li>
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
                  </li>
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
                  <Link href="/">About Us</Link>
                </li>
                <li className="list-item">
                  <Link href="/">Products</Link>
                </li>
                <li className="list-item">
                  <Link href="/">Gallery</Link>
                </li>
                <li className="list-item">
                  <Link href="/">Career</Link>
                </li>
                <li className="list-item">
                  <Link href="/">Contact Us</Link>
                </li>
                <li className="list-item">
                  <Link href="/">Blogs</Link>
                </li>
                <li className="list-item">
                  <Link href="/">Testimonials</Link>
                </li>
              </ul>
            </div>
            <div className=" xl-2 lg-4 sm-6 our-products-sec">
              <h4 className="footer-info-heading">Our Products</h4>
              <div className="our-sub-cat">
                <h5>Roof Section</h5>
                <ul className="list-items">
                  <li className="list-item">
                    <Link href="/">AWC ROOF 540</Link>
                  </li>
                  <li className="list-item">
                    <Link href="/">AWC ROOF-300</Link>
                  </li>
                  <li className="list-item">
                    <Link href="/">AWC ROOF-250</Link>
                  </li>
                </ul>
              </div>
              <div className="our-sub-cat">
                <h5>Wall Section</h5>
                <ul className="list-items">
                  <li className="list-item">
                    <Link href="/">AWC-WALLMATE</Link>
                  </li>
                  <li className="list-item">
                    <Link href="/">AWC-ELASTIC</Link>
                  </li>
                </ul>
              </div>
              <div className="our-sub-cat">
                <h5>Exclusive Products</h5>
                <ul className="list-items">
                  <li className="list-item">
                    <Link href="/">TUFF COAT</Link>
                  </li>
                  <li className="list-item">
                    <Link href="/">CLEAR COAT</Link>
                  </li>
                  <li className="list-item">
                    <Link href="/">SWIFT PLAST</Link>
                  </li>
                </ul>
              </div>
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
                  <b>Mobile:</b>
                  <Link href="tel:+918686862475"> +91 86 86 86 2475</Link>
                </p>
                <p>
                  <b>E-mail:</b>
                  <Link href="mailto:info@awcindia.in">
                    info@awcindia.in / india.awc@gmail.com
                  </Link>
                </p>
                <p>
                  <b>Website:</b>
                  <Link href="https://awcindia.in/"> www.awcindia.in</Link>
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
