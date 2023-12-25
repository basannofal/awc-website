import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Tabs = ({ pid, lognDesc }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [productImage, setProductImage] = useState([]);
  const [productVideo, setProductVideo] = useState([]);
  const [productDocs, setProductDocs] = useState([]);
  const [productCertificate, setProductCertificate] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + "...";
    } else {
      return str;
    }
  };

  const getProductImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproductimage/${pid}`
      );
      setProductImage(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getProductVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproductvideo/${pid}`
      );
      setProductVideo(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getProductCertificate = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproductcertificate/${pid}`
      );
      setProductCertificate(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const getProductDocs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproductdocs/${pid}`
      );
      setProductDocs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  function extractFirstParagraph(content) {
    const parser = new DOMParser();

    const doc = parser.parseFromString(content, "text/html");

    const firstParagraphTag = doc.querySelector("p");

    if (firstParagraphTag) {
      const words = firstParagraphTag.textContent.split(/\s+/);
      const limitedText = words.slice(0, 20).join(" ");
      return limitedText;
    }

    return "";
  }

  useEffect(() => {
    const fetchData = async () => {
      await getProductImages();
      await getProductVideo();
      await getProductDocs();
      await getProductCertificate();
    };
    fetchData();
  }, [pid]);

  return (
    <>
      <div className="main_tab_section">
        <div>
          <button
            className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => handleTabClick("description")}
          >
            DESCRIPTION
          </button>
          <button
            className={`tab-btn ${activeTab === "docs" ? "active" : ""}`}
            onClick={() => handleTabClick("docs")}
          >
            DOCS
          </button>
          <button
            className={`tab-btn ${activeTab === "photos" ? "active" : ""}`}
            onClick={() => handleTabClick("photos")}
          >
            PHOTOS
          </button>
          <button
            className={`tab-btn ${
              activeTab === "testing-videos" ? "active" : ""
            }`}
            onClick={() => handleTabClick("testing-videos")}
          >
            TESTING VIDEOS
          </button>
          <button
            className={`tab-btn ${activeTab === "certificate" ? "active" : ""}`}
            onClick={() => handleTabClick("certificate")}
          >
            CERTIFICATES
          </button>
        </div>

        {activeTab === "description" && (
          <div>
            <p className="product_view_desc_title">Product Information</p>
            <div dangerouslySetInnerHTML={{ __html: lognDesc }}></div>
          </div>
        )}
        {activeTab === "docs" && (
          <div>
            <p className="product_view_doc_title">
              Technical Details and Brouchers
            </p>
            {productDocs.map((item, idx) => {
              return (
                <div className="product_view_docs_main">
                  <div className="product_view_doc_thumbnail">
                    <img src={"/assets/images/client/pdf 2.png"} alt="" />
                  </div>
                  <div className="product_view_doc_thumbnail_title">
                    {item?.pdf_title}{" "}
                  </div>
                  <div className="product_view_doc_dowonload">
                    <Link
                      href={`/assets/upload/products/productDocs/${item?.pdf_link}`}
                      download
                    >
                      <i class="fa-solid fa-download"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="product_view_docs_main">
              <div className="product_view_doc_thumbnail">
                <img src={"/assets/images/client/pdf 2.png"} alt="" />
              </div>
              <div className="product_view_doc_thumbnail_title">
                Why To Choose Roof 540?{" "}
              </div>
              <div className="product_view_doc_dowonload">
                <i class="fa-solid fa-download"></i>
              </div>
            </div>
            <div className="product_view_docs_main">
              <div className="product_view_doc_thumbnail">
                <img src={"/assets/images/client/pdf 2.png"} alt="" />
              </div>
              <div className="product_view_doc_thumbnail_title">
                Why To Choose Roof 540?{" "}
              </div>
              <div className="product_view_doc_dowonload">
                <i class="fa-solid fa-download"></i>
              </div>
            </div>
            <div className="product_view_docs_main">
              <div className="product_view_doc_thumbnail">
                <img src={"/assets/images/client/pdf 2.png"} alt="" />
              </div>
              <div className="product_view_doc_thumbnail_title">
                Why To Choose Roof 540?{" "}
              </div>
              <div className="product_view_doc_dowonload">
                <i class="fa-solid fa-download"></i>
              </div>
            </div>
            <div className="product_view_docs_main">
              <div className="product_view_doc_thumbnail">
                <img src={"/assets/images/client/pdf 2.png"} alt="" />
              </div>
              <div className="product_view_doc_thumbnail_title">
                Why To Choose Roof 540?{" "}
              </div>
              <div className="product_view_doc_dowonload">
                <i class="fa-solid fa-download"></i>
              </div>
            </div>
            <div className="product_view_docs_main">
              <div className="product_view_doc_thumbnail">
                <img src={"/assets/images/client/pdf 2.png"} alt="" />
              </div>
              <div className="product_view_doc_thumbnail_title">
                Why To Choose Roof 540?{" "}
              </div>
              <div className="product_view_doc_dowonload">
                <i class="fa-solid fa-download"></i>
              </div>
            </div>
          </div>
        )}
        {activeTab === "photos" && (
          <div>
            <p className="product_view_photo_title">Photos</p>
            <div className="grid">
              {productImage.map((item, idx) => {
                return (
                  <div className="lg-4 md-6 sm-12 product_view_images_gallary">
                    <img
                      src={`/assets/upload/products/productImages/${item?.product_image}`}
                      alt={item?.alternative}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === "testing-videos" && (
          <div>
            <p className="product_view_photo_title">Photos</p>
            <div className="grid">
              {productVideo.map((item, idx) => {
                return (
                  <div className="lg-4 md-6 sm-12 product_view_images_gallary">
                    <Link href={item?.product_video} target="_blank">
                    <div className="product_view_youtube_icon">
                      <img
                        src={`/assets/upload/products/productVedios/${item?.video_thumbnail}`}
                        alt={extractFirstParagraph(item?.video_description)}
                      />
                      <i class="fa-brands fa-youtube"></i>
                    </div>
                    <p className="product-view-title">
                      {truncateString(item?.video_title, 40)}
                    </p>
                    <p>@Awc India</p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === "certificate" && (
          <div>
            <p className="product_view_doc_title">
              Technical Details and Brouchers
            </p>
            {productCertificate.map((item, idx) => {
              return (
                <div className="product_view_docs_main">
                  <div className="product_view_doc_thumbnail">
                    <img src={"/assets/images/client/pdf 2.png"} alt="" />
                  </div>
                  <div className="product_view_doc_thumbnail_title">
                    {item?.certificate_title}{" "}
                  </div>
                  <div className="product_view_doc_dowonload">
                    <Link
                      href={`/assets/upload/products/productCertificate/${item?.certificate_link}`}
                      download
                    >
                      <i class="fa-solid fa-download"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Tabs;
