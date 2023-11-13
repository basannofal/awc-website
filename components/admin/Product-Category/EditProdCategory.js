import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Link from "next/link";

const EditProdCategory = () => {
  const router = useRouter();

  let cateId = router.query.id;
  const [getActiveCateData, setGetActiveCateData] = useState([]);
  const [editProductCategoryData, setEditProductCategoryData] = useState({
    category_name: "",
    category_title: "",
    meta_description: "",
    canonical_url: "",
    category_description: "",
    category_image: null,
    sub_category: "",
  });
  const [editMetaTag, setEditMetaTag] = useState([]);
  const [editMetaKeyword, setEditMetaKeyword] = useState([]);

  //get active category
  const getActiveCategoryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productcategorychanges/router`
      );
      setGetActiveCateData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //get category with id
  const getProductCategoryForEdit = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productcategory/${id}`
      );
      setEditProductCategoryData(response.data[0]);
      const keyString = response.data[0].meta_keyword;
      setEditMetaKeyword(keyString.split(","));
      const tagString = response.data[0].meta_tag;
      setEditMetaTag(tagString.split(","));
    } catch (err) {
      console.log(err);
    }
  };

  //eit cate
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProductCategoryData((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    setEditProductCategoryData((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
    event.target.value = null;
  };

  // update category
  const saveEditCategoryData = async (e) => {
    try {
      const formdata = new FormData();
      formdata.append("category_name", editProductCategoryData.category_name);
      formdata.append("category_title", editProductCategoryData.category_title);
      formdata.append(
        "meta_description",
        editProductCategoryData.meta_description
      );
      formdata.append("canonical_url", editProductCategoryData.canonical_url);
      formdata.append(
        "category_description",
        editProductCategoryData.category_description
      );
      formdata.append("category_image", editProductCategoryData.category_image);
      formdata.append("sub_category", editProductCategoryData.sub_category);
      formdata.append("meta_tag", editMetaTag);
      formdata.append("meta_keyword", editMetaKeyword);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      };

      console.log(cateId);

      const url = `${process.env.NEXT_PUBLIC_API_URL}/productcategory/${cateId}`;
      const res = await axios.patch(url, formdata, config );
      router.push("/admin/product-category");
    } catch (error) {
      console.error("Error updating category data:", error);
    }
  };

  // edit meta keyword
  const handleKeyword = (event) => {
    if (event.key === "Enter" || event.key == ",") {
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
    if (event.key === "Enter" || event.key == ",") {
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
    getActiveCategoryData();
    getProductCategoryForEdit(cateId);
  }, [cateId]);
  return (
    <>
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Edit Product Category</p>
          <p>
            <Link href="/admin/admindashboar">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Edit Product Category</span>
          </p>
        </div>
        <div className="add_data_form">
          <form>
            <div className="mb-3">
              <label htmlFor="category_name" className="modal_label">
                Category Name:-
              </label>
              <input
                type="text"
                id="category_name"
                name="category_name"
                className="modal_input"
                placeholder="Enter Category Name"
                onChange={handleEditChange}
                value={editProductCategoryData.category_name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category_title" className="modal_label">
                Category Title:-
              </label>
              <input
                type="text"
                id="category_title"
                name="category_title"
                className="modal_input"
                placeholder="Enter Category Title"
                onChange={handleEditChange}
                value={editProductCategoryData.category_title}
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
            <div className="mb-3">
              <label htmlFor="meta_description" className="modal_label">
                Meta Description:-
              </label>
              <textarea
                type="text"
                rows="5"
                cols="70"
                id="meta_description"
                name="meta_description"
                className="modal_input"
                placeholder="Enter Meta Description"
                onChange={handleEditChange}
                value={editProductCategoryData.meta_description}
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
                onChange={handleEditChange}
                value={editProductCategoryData.canonical_url}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category_description" className="modal_label">
                Category Description:-
              </label>
              <textarea
                type="text"
                rows="5"
                cols="70"
                id="category_description"
                name="category_description"
                className="modal_input"
                placeholder="Enter Category Description"
                onChange={handleEditChange}
                value={editProductCategoryData.category_description}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category_image" className="modal_label">
                Category Image:-
              </label>
              <img
                src={`/assets/upload/${editProductCategoryData.category_image}`}
                width="100px"
                height="100px"
                alt="profile"
              />
              <input
                type="file"
                id="category_image"
                name="category_image"
                className="modal_input"
                onChange={handleEditFileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sub_category" className="modal_label">
                Choose Sub Category:
              </label>
              <select
                name="sub_category"
                id="sub_category"
                form="sub_category"
                className="modal_input"
                onChange={handleEditChange}
                value={editProductCategoryData.sub_category}
              >
                <option value={0}>Choose Sub Category</option>
                {getActiveCateData.map((cate) => {
                  return (
                    <option key={cate.category_id} value={cate.category_id}>
                      {cate.category_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <button
                type="button"
                onClick={saveEditCategoryData}
                className="success_btn"
              >
                SAVE
              </button>
              <Link href="/admin/product-category">
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

export default EditProdCategory;
