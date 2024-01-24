import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const Certificate = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [certificate, setCertificate] = useState([]);

  const getVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/videos/router`
      );
      setVideos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getCertificates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/certificate/router`
      );
      setCertificate(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await getVideos();
    await getCertificates();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const videos_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, videos.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, videos.length),
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(1, videos.length),
          slidesToScroll: 1,
        },
      },
    ],
  };

  const certificate_settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, certificate.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, certificate.length), // Adjust slidesToShow dynamically
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(1, certificate.length), // Adjust slidesToShow dynamically
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <section className="certificate-sec">
        {/* Certificate section */}
        <div className="container-certificate">
          <div className="certificate-inner">
            <h3>CERTIFICATES</h3>
            <p>Our Commitment to Quality, Environment, and Safety</p>
            {/* <div className="lg-4 md-6 sm-12"> */}
            <Slider {...certificate_settings} className="space-y-7">
              {certificate.map((certificate) => (
                <div key={certificate.id} className="certificate-content">
                  <div className="certificate-image">
                    <img
                      src={`/assets/upload/about/certificates/${certificate.thumbnail}`}
                      alt={`Certificate ${certificate.id}`}
                    />
                  </div>
                  <div className="flex items-center pt-3 pr-5">
                    <h6>{certificate.title}</h6>
                    <div className="certificate-download">
                      <a
                        href={`/assets/upload/about/certificates/${certificate.pdf}`}
                        download
                      >
                        <img
                          src={"./assets/images/client/download.png"}
                          alt="Download"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            {/* </div> */}
          </div>
        </div>

        {/* YouTube Video Links */}
        <div className="container-youtube mt-5">
          <div className="youtube-inner">
            {/* <div className="grid mt-14"> */}
            <Slider {...videos_settings} className="space-y-7">
              {videos.map((item, idx) => {
                return (
                  <div className="xl-4 lg-4 md-6 sm-6" key={item.id}>
                    <div className="youtube-content">
                      <div className="youtube-thumbnail">
                        <img
                          src={`/assets/upload/about/videos/${item.thumbnail}`}
                        />
                        <div className="iconOfYo9utube">
                          <Link href={`${item.link}`} target="_blank">
                            <img src={"./assets/images/client/youtube.png"} />
                          </Link>
                        </div>
                      </div>
                      <h6>{item.title}</h6>
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
            </Slider>
            {/* </div> */}
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
                  IGBC membership provides AWC with access to resources2C
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
