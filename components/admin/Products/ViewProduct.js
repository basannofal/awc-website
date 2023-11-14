import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "@/layouts/Loading";
import Header from "@/layouts/Header";
import Link from "next/link";

const ViewProduct = () => {
  const router = useRouter();
  let prodId = router.query.id;
  const [viewProductData, setViewProductData] = useState([]);
  const [viewMetaTag, setViewMetaTag] = useState([]);
  const [viewMetaKeyword, setViewtMetaKeyword] = useState([]);
  const [loading, setLoading] = useState(true);
  //get data with id
  const getProductDataForView = async (prodId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${prodId}`);
      setViewProductData(response.data[0]);
      const keyString = response.data[0].meta_keyword;
      setViewtMetaKeyword(keyString.split(","));
      const tagString = response.data[0].meta_tag;
      setViewMetaTag(tagString.split(","));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDataForView(prodId);
  }, [prodId]);
  return (
    <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">View Product</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>View Product</span>
          </p>
        </div>
        <div className="add_data_form">
          <div className="view_data_sections">
            <span>Product Short Description:-</span>
            <p
              dangerouslySetInnerHTML={{
                __html: viewProductData.product_short_desc,
              }}
            ></p>
          </div>
          <div className="view_data_sections">
            <span>Product Long Description:-</span>
            <p
              dangerouslySetInnerHTML={{
                __html: viewProductData.product_long_desc,
              }}
            ></p>
          </div>
          <div className="view_data_sections">
            <span>Meta Tag:-</span>
            <div className="meta_main_section">
              {viewMetaTag.map((tag, index) => (
                <div className="meta_tag_section" key={index}>
                  <div className="meta_tag_text">{tag}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="view_data_sections">
            <span>Meta Description:-</span>
            <p>{viewProductData.meta_desc}</p>
          </div>
          <div className="view_data_sections">
            <span>Meta Keyword:-</span>
            <div className="meta_main_section">
              {viewMetaKeyword.map((keyword, index) => (
                <div className="meta_tag_section" key={index}>
                  <div className="meta_tag_text">{keyword}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="view_data_sections">
            <span>Canonical URL:-</span>
            <p>{viewProductData.canonical_url}</p>
          </div>
          <div className="view_data_sections">
            <Link href="/admin/products">
              <button type="button" className="success_btn">
                BACK
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewProduct;
