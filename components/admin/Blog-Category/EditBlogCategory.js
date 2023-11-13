import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Link from "next/link";

const EditBlogCategory = () => {
  const router = useRouter();
  let cateId = router.query.id;

  const [editBlogCategoryData, setEditBlogCategoryData] = useState({
    category_title: "",
    category_description: "",
    meta_desc: "",
    canonical_url: "",
    category_image: null,
    category_icon: null,
  });
  const [editMetaTag, setEditMetaTag] = useState([]);
  const [editMetaKeyword, setEditMetaKeyword] = useState([]);

  //get data with id
  const getEditBlogCategory = async (cateId) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`)
      .then((res) => {
        setEditBlogCategoryData(res.data[0]);
        const keyString = res.data[0].meta_keyword;
        setEditMetaKeyword(keyString.split(","));
        const tagString = res.data[0].meta_tag;
        setEditMetaTag(tagString.split(","));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //edit
  const handleEditCategory = async (event) => {
    const { name, value } = event.target;
    setEditBlogCategoryData((prevCateData) => ({
      ...prevCateData,
      [name]: value,
    }));
  };
  const handleEditFileChange = async (event) => {
    const file = event.target.files[0];
    setEditBlogCategoryData((prevImage) => ({
      ...prevImage,
      [event.target.name]: file,
    }));
  };
  const saveEditCategory = async (cateId) => {
    try {
      const formdata = new FormData();
      formdata.append("category_title", editBlogCategoryData.category_title);
      formdata.append(
        "category_description",
        editBlogCategoryData.category_description
      );
      formdata.append("meta_tag", editMetaTag);
      formdata.append("meta_desc", editBlogCategoryData.meta_desc);
      formdata.append("meta_keyword", editMetaKeyword);
      formdata.append("canonical_url", editBlogCategoryData.canonical_url);

      formdata.append("category_image", editBlogCategoryData.category_image);
      formdata.append("category_icon", editBlogCategoryData.category_icon);
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`,
        formdata
      );
      router.push("/admin/blog-category");
    } catch (error) {
      console.error("Error updating blog category:", error);
    }
  };
  const handleKeyword = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      setEditMetaKeyword([...editMetaKeyword, event.target.value]);
      event.target.value = "";
    }
  };
  const RemoveKeyword = (idx) => {
    const newArray = [...editMetaKeyword];
    newArray.splice(idx, 1);
    setEditMetaKeyword(newArray);
  };

  // edit meta tags
  const handleTags = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      setEditMetaTag([...editMetaTag, event.target.value.trim()]);
      event.target.value = "";
    }
  };
  const RemoveTags = (idx) => {
    const newArray = [...editMetaTag];
    newArray.splice(idx, 1);
    setEditMetaTag(newArray);
  };

  useEffect(() => {
    getEditBlogCategory(cateId);
  }, [cateId]);
  return (
    <>
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Edit Product Category</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Edit Product Category</span>
          </p>
        </div>
        <div className="add_data_form">
          <form>
            <div className="mb-3">
              <label htmlFor="editBlog_title" className="modal_label">
                Blog Title:-
              </label>
              <input
                type="text"
                id="editBlog_title"
                name="category_title"
                className="modal_input"
                onChange={handleEditCategory}
                value={editBlogCategoryData.category_title}
                placeholder="Enter Category Title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editBlog_description" className="modal_label">
                Blog Description:-
              </label>
              <textarea
                type="text"
                rows="5"
                cols="70"
                id="editBlog_description"
                name="category_description"
                className="modal_input"
                onChange={handleEditCategory}
                value={editBlogCategoryData.category_description}
                placeholder="Enter Category Description"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="meta_tag" className="modal_label">
                Meta Tag:-
              </label>
              <input
                type="text"
                id="meta_tag"
                name="meta_tag"
                className="modal_input"
                placeholder="Enter Meta Tag"
                onKeyDown={handleTags}
              />
            </div>
            <div className="mb-3">
              <div className="meta_main_section">
                {editMetaTag.map((tag, index) => (
                  <div className="meta_tag_section" key={index}>
                    <div className="meta_tag_text">{tag}</div>
                    <div className="meta_remove_icon">
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => {
                          RemoveTags(index);
                        }}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="meta_desc" className="modal_label">
                Meta Description:-
              </label>
              <textarea
                type="text"
                rows="5"
                cols="70"
                id="meta_desc"
                name="meta_desc"
                className="modal_input"
                placeholder="Enter Meta Description"
                onChange={handleEditCategory}
                value={editBlogCategoryData.meta_desc}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="meta_keyword" className="modal_label">
                Meta Keayword:-
              </label>
              <input
                type="text"
                id="meta_keyword"
                name="meta_keyword"
                className="modal_input"
                placeholder="Enter Meta Keyword"
                onKeyDown={handleKeyword}
              />
            </div>
            <div className="mb-3">
              <div className="meta_main_section">
                {editMetaKeyword.map((keyword, index) => (
                  <div className="meta_tag_section" key={index}>
                    <div className="meta_tag_text">{keyword}</div>
                    <div className="meta_remove_icon">
                      <i
                        className="fa-solid fa-xmark"
                        onClick={() => {
                          RemoveKeyword(index);
                        }}
                      ></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="canonical_url" className="modal_label">
                Conanical URL:-
              </label>
              <input
                type="text"
                id="canonical_url"
                name="canonical_url"
                className="modal_input"
                placeholder="Enter Conanical URL"
                onChange={handleEditCategory}
                value={editBlogCategoryData.canonical_url}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editBlog_image" className="modal_label">
                Blog Image:-
              </label>
              <input
                type="file"
                id="editBlog_image"
                name="category_image"
                onChange={handleEditFileChange}
                className="modal_input mb-3"
              />
              <img
                src={`/assets/upload/blog/${editBlogCategoryData.category_image}`}
                width="100px"
                height="100px"
                alt="category_image"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="editBlog_icon" className="modal_label">
                Blog Icon:-
              </label>
              <input
                type="file"
                id="editBlog_icon"
                name="category_icon"
                className="modal_input mb-3"
                onChange={handleEditFileChange}
              />
              <img
                src={`/assets/upload/blog/${editBlogCategoryData.category_icon}`}
                width="100px"
                height="100px"
                alt="category_icon"
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                onClick={() =>
                  saveEditCategory(editBlogCategoryData.blog_cate_id)
                }
                className="success_btn"
              >
                SAVE
              </button>
              <Link href="/admin/blog-category">
                <button type="button" className="success_btn cancel_btn">
                  CANCEL
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditBlogCategory;
