import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Loading from "@/layouts/Loading";
import Header from "@/layouts/Header";
import Link from "next/link";
import Toast, { ErrorToast } from "@/layouts/toast/Toast";

const EditProduct = () => {
  const router = useRouter();
  let prodId = router.query.id;
  const [getActiveCateData, setGetActiveCateData] = useState([]);
  const [editProductData, setEditProductData] = useState({
    cate_id: "",
    product_title: "",
    product_short_desc: "",
    product_long_desc: "",
    meta_desc: "",
    canonical_url: "",
    product_image: null,
  });
  const [editMetaTag, setEditMetaTag] = useState([]);
  const [editMetaKeyword, setEditMetaKeyword] = useState([]);
  const [loading, setLoading] = useState(true);

    // tabs
    const [activeTab, setActiveTab] = useState("general");

    const showTab = (tabId) => {
      setActiveTab(tabId);
    };

  //get active category
  const getActiveCategoryData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productcategorychanges/router`);
      setGetActiveCateData(response.data);
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  //get product with id
  const getProductCategoryForEdit = async (prodId) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${prodId}`);
      setEditProductData(response.data[0]);
      const keyString = response.data[0].meta_keyword;
      setEditMetaKeyword(keyString.split(","));
      const tagString = response.data[0].meta_tag;
      setEditMetaTag(tagString.split(","));
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  //editor
  const editorShortRef = useRef(null);
  const editorLongRef = useRef(null);
  const handleShortEditorChange = (content, editor) => {
    setEditProductData((prevData) => ({
      ...prevData,
      product_short_desc: content,
    }));
  };
  const handleLongEditorChange = (content, editor) => {
    setEditProductData((prevData) => ({
      ...prevData,
      product_long_desc: content,
    }));
  };
  //end
  //edit cate
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProductData((prevProdData) => ({
      ...prevProdData,
      [name]: value,
    }));
  };
  const handleEditFileChange = (event) => {
    const file = event.target.files[0];
    setEditProductData((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
    event.target.value = null;
  };
  const saveEditProductData = async (prodId) => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("cate_id", editProductData.cate_id);
      formdata.append("product_title", editProductData.product_title);
      formdata.append("product_short_desc", editProductData.product_short_desc);
      formdata.append("product_long_desc", editProductData.product_long_desc);
      formdata.append("meta_tag", editMetaTag);
      formdata.append("meta_desc", editProductData.meta_desc);
      formdata.append("meta_keyword", editMetaKeyword);
      formdata.append("canonical_url", editProductData.canonical_url);
      formdata.append("product_image", editProductData.product_image);


      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${prodId}`, formdata);
      window.scrollTo({ behavior: "smooth", top: 0 });
      setLoading(false);
      router.push("/admin/products");
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // edit meta keyword
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
    getActiveCategoryData();
    getProductCategoryForEdit(prodId);
  }, [prodId]);

  return (
     <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Edit Product</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Edit Product</span>
          </p>
        </div>
        <div className="tabs-container">
          <div className="tabs">
            <div
              className={`tab ${activeTab === "general" ? "active" : ""}`}
              onClick={() => showTab("general")}
            >
              General
            </div>
            <div
              className={`tab ${activeTab === "seo" ? "active" : ""}`}
              onClick={() => showTab("seo")}
            >
              SEO
            </div>
            <div
              className={`tab ${activeTab === "image" ? "active" : ""}`}
              onClick={() => showTab("image")}
            >
              Images
            </div>
          </div>

          <div
            id="general"
            className={`tab-content add_data_form ${
              activeTab === "general" ? "active" : ""
            }`}
          >
            <form>
              <div className="mb-3">
                <label htmlFor="product_title" className="modal_label">
                  Product Title:-
                </label>
                <input
                  type="text"
                  id="product_title"
                  name="product_title"
                  className="modal_input"
                  placeholder="Enter Product Title"
                  value={editProductData?.product_title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="mb-3">
                <p className="modal_label">Product Short Description:-</p>
                <Editor
                  apiKey="1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo"
                  onInit={(evt, editor) => (editorShortRef.current = editor)}
                  initialValue={editProductData?.product_short_desc}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                  }}
                  onChange={(e) =>
                    handleShortEditorChange(editorShortRef.current.getContent())
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <p className="modal_label">Product Long Description:-</p>
                <Editor
                  apiKey="1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo"
                  onInit={(evt, editor) => (editorLongRef.current = editor)}
                  initialValue={editProductData?.product_long_desc}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                  }}
                  onChange={(e) =>
                    handleLongEditorChange(editorLongRef.current.getContent())
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product_image" className="modal_label">
                  Product Thumbnail:-
                </label>
                <input
                  type="file"
                  id="product_image"
                  name="product_image"
                  className="modal_input"
                  onChange={handleEditFileChange}
                  required
                />
              </div>
              <img
                src={`/assets/upload/products/${editProductData?.product_image}`}
                width="100%"
                className="modal_data_image"
                alt="product_image"
              />
              <div className="mb-3">
                <label htmlFor="cate_id" className="modal_label">
                  Choose Category:
                </label>
                <select
                  name="cate_id"
                  id="cate_id"
                  form="cate_id"
                  className="modal_input"
                  onChange={handleEditChange}
                  required
                >
                  <option value={0}>Choose Category</option>
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
                  onClick={() => {
                    saveEditProductData(editProductData.product_id);
                  }}
                  className="success_btn"
                >
                  SAVE
                </button>
                <Link href="/admin/products">
                  <button type="button" className="success_btn cancel_btn">
                    CANCEL
                  </button>
                </Link>
              </div>
            </form>
          </div>
          <div
            id="seo"
            className={`tab-content add_data_form ${
              activeTab === "seo" ? "active" : ""
            }`}
          >
            <form>
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
                  onChange={handleEditChange}
                  value={editProductData?.meta_desc}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="canonical_url" className="modal_label">
                  Canonical URL:-
                </label>
                <input
                  type="text"
                  id="canonical_url"
                  name="canonical_url"
                  className="modal_input"
                  placeholder="Enter Canonical URL"
                  onChange={handleEditChange}
                  value={editProductData?.canonical_url}
                />
              </div>
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    saveEditProductData(editProductData.product_id);
                  }}
                  className="success_btn"
                >
                  SAVE
                </button>
                <Link href="/admin/products">
                  <button type="button" className="success_btn cancel_btn">
                    CANCEL
                  </button>
                </Link>
              </div>
            </form>
          </div>
          <div
            id="image"
            className={`tab-content add_data_form ${
              activeTab === "image" ? "active" : ""
            }`}
          >
            image field
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProduct;
