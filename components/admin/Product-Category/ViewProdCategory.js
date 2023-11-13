import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import { useRouter } from "next/router";
import Link from "next/link";

const ViewProdCategory = () => {
  const router = useRouter();
  let cateId = router.query.id;
  const [viewProductCategoryData, setViewProductCategoryData] = useState([]);
  const [viewMetaTag, setViewMetaTag] = useState([]);
  const [viewMetaKeyword, setViewtMetaKeyword] = useState([]);
  const [loading, setLoading] = useState(true);

  //get data with id
  const getProductCategoryForView = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productcategory/${id}`
      );
      console.log(response.data);
      setViewProductCategoryData(response.data[0]);
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
    getProductCategoryForView(cateId);
  }, [cateId]);
  return (
    <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">View Product Category</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>View Product Category</span>
          </p>
        </div>
        <div className="add_data_form">
          <div className="view_data_sections">
            <span>Category Description:-</span>
            <p
              dangerouslySetInnerHTML={{
                __html: viewProductCategoryData.category_description,
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
            <p>{viewProductCategoryData.meta_description}</p>
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
            <p>{viewProductCategoryData.canonical_url}</p>
          </div>
          <div className="view_data_sections">
            <Link href="/admin/product-category">
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
export default ViewProdCategory;