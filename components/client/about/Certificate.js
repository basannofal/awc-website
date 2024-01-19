import axios from "axios";
import React, { useEffect, useState } from "react";

const Certificate = () => {
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState([]);

  const getTestimonial = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/testimonials/router`
      );
      console.log(response.data);
      setTestimonial(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await getTestimonial();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="certificate-sec">
        <div className="container-certificate">
          <div className="certificate-inner">
            <h3>CERTIFICATES</h3>
            <p>Our Commitment to Quality, Environment, and Safety</p>
            <div className="grid mt-14">
              <div className="xl-4 lg-4 md-6 sm-12">
                <div className="certificate-content">
                  <div className="certificate-image">
                    <img src={"./assets/images/client/certificate1.webp"} />
                  </div>
                  <div className="flex items-center">
                    <h6>(EMS) Environmental Management System</h6>
                    <div className="certificate-download">
                      <img src={"./assets/images/client/download.png"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl-4 lg-4 md-6 sm-12">
                <div className="certificate-content">
                  <div className="certificate-image">
                    <img src={"./assets/images/client/certificate2.webp"} />
                  </div>
                  <div className="flex items-center">
                    <h6>
                      Occupational Health and Safety Management System (OHSMS)
                    </h6>
                    <div className="certificate-download">
                      <img src={"./assets/images/client/download.png"} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl-4 lg-4 md-6 sm-12">
                <div className="certificate-content">
                  <div className="certificate-image">
                    <img src={"./assets/images/client/certificate3.webp"} />
                  </div>
                  <div className="flex items-center">
                    <h6>(QMS) Quality Management System</h6>
                    <div className="certificate-download">
                      <img src={"./assets/images/client/download.png"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Video Links */}
        <div className="container-youtube">
          <div className="youtube-inner">
            <div className="grid mt-14">
              {testimonial.map((item, idx) => {
                return (
                  <div className="xl-4 lg-4 md-6 sm-6" key={item.id}>
                    <div className="youtube-content">
                      <div className="youtube-thumbnail">
                        <img src={"./assets/images/client/unit_image_1.png"} />
                        <div className="iconOfYo9utube">
                          <img src={"./assets/images/client/youtube.png"} />
                        </div>
                      </div>
                      <h6>AWC Introductory Video</h6>
                      <div className="calendar-info flex items-center">
                        <div className="calendar">
                          <img src={"./assets/images/client/calendar.png"} />
                        </div>
                        <p className="pl-3">@awcindiawaterproofingco4479</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="xl-4 lg-4 md-6 sm-6">
                <div className="youtube-content">
                  <div className="youtube-thumbnail">
                    <img src={"./assets/images/client/youtube-video-2.png"} />
                    <div className="iconOfYo9utube">
                      <img src={"./assets/images/client/youtube.png"} />
                    </div>
                  </div>
                  <h6>How we do Application For AWC Roof 540</h6>
                  <div className="calendar-info flex items-center">
                    <div className="calendar">
                      <img src={"./assets/images/client/calendar.png"} />
                    </div>
                    <p className="pl-3">@awcindiawaterproofingco4479</p>
                  </div>
                </div>
              </div>
              <div className="xl-4 lg-4 md-6 sm-6">
                <div className="youtube-content">
                  <div className="youtube-thumbnail">
                    <img src={"./assets/images/client/youtube-video-3.png"} />
                    <div className="iconOfYo9utube">
                      <img src={"./assets/images/client/youtube.png"} />
                    </div>
                  </div>\
                  <h6>
                    AWC ROOF 540 premium quality waterproofing systems, for
                    virtually any kind of roofs
                  </h6>
                  <div className="calendar-info flex items-center">
                    <div className="calendar">
                      <img src={"./assets/images/client/calendar.png"} />
                    </div>
                    <p className="pl-3">@awcindiawaterproofingco4479</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member */}
        <div className="container-member">
          <div className="member-inner">
            <div className="grid">
              <div className="xl-6 lg-6 md-12 sm-12">
                <h6>IGBC MEMBER</h6>
                <p>
                  The Indian Green Building Council (IGBC) is a part of the
                  Confederation of Indian Industry (CII) since the year 2001.
                  Its vision is "To enable a sustainable built environment for
                  all and facilitate India to be one of the global leaders in
                  the sustainable built environment by 2025".The prestigious
                  IGBC membership provides AWC with access to resources,
                  international best practices and the latest in the field of
                  Green building initiatives thus giving us the crucial
                  competitive advantage. AWC is proud to be in the company of
                  experts, professionals and multi-industry organizations that
                  are at the forefront of creating the green building revolution
                  in India.
                </p>
              </div>
              <div className="xl-6 lg-6 md-12 sm-12">
                <div className="member-image">
                  <img src={"./assets/images/client/member-certificate.png"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Certificate;
