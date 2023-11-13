import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import { useRouter } from "next/router";

const ViewBlogCategory = () => {
  const router = useRouter();
  let cateId = router.query.id;
  const [viewBlogCategory, setViewBlogCategory] = useState([]);
  const [viewMetaTag, setViewMetaTag] = useState([]);
  const [viewMetaKeyword, setViewtMetaKeyword] = useState([]);
  const [loading, setLoading] = useState(true);

  //get data with id
  const getBlogCategoryForView = async (cateId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`
      );
      setViewBlogCategory(response.data[0]);
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
    getBlogCategoryForView(cateId);
  }, [cateId]);

  return (
    <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">View Blog Category</p>
          <p>
            <Link href="/admin/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>View Blog Category</span>
          </p>
        </div>
        <div className="add_data_form">
          <div className="view_data_sections">
            <span>Category Description:-</span>
            <div className="meta_main_section">
              <p
                dangerouslySetInnerHTML={{
                  __html: viewBlogCategory.category_description,
                }}
              ></p>
            </div>
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
            <p>{viewBlogCategory.meta_desc}</p>
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
            <p>{viewBlogCategory.canonical_url}</p>
          </div>
          <div className="view_data_sections">
            <Link href="/admin/blog-category">
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

export default ViewBlogCategory;
