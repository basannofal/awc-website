import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import Link from "next/link";
import Toast, { ErrorToast } from "@/layouts/toast/Toast";

const AddProduct = () => {
  const [getActiveCateData, setGetActiveCateData] = useState([]);
  const [addProductData, setAddProductData] = useState({
    cate_id: "",
    product_title: "",
    product_short_desc: "",
    product_long_desc: "",
    meta_desc: "",
    canonical_url: "",
    product_image: null,
  });
  const [addMetaTag, setAddMetaTag] = useState([]);
  const [addMetaKeyword, setAddMetaKeyword] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //get active category
  const getActiveCategoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productcategorychanges/router`
      );
      setGetActiveCateData(response.data);
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
    setAddProductData((prevData) => ({
      ...prevData,
      product_short_desc: content,
    }));
  };
  const handleLongEditorChange = (content, editor) => {
    setAddProductData((prevData) => ({
      ...prevData,
      product_long_desc: content,
    }));
  };
  //end
  //add product data section start
  const handleChangeProduct = (event) => {
    const { name, value } = event.target;
    setAddProductData((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const handleAddFileChange = (event) => {
    const file = event.target.files[0];
    setAddProductData((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
  };
  const addCategoryData = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("cate_id", addProductData.cate_id);
      formdata.append("product_title", addProductData.product_title);
      formdata.append("product_short_desc", addProductData.product_short_desc);
      formdata.append("product_long_desc", addProductData.product_long_desc);
      formdata.append("meta_desc", addProductData.meta_desc);
      formdata.append("canonical_url", addProductData.canonical_url);
      formdata.append("product_image", addProductData.product_image);
      formdata.append("meta_tag", addMetaTag);
      formdata.append("meta_keyword", addMetaKeyword);

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/router`, formdata);
      setLoading(false);
      router.push("/admin/products");
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // add meta keyword
  const handleKeyword = (event) => {
    const value = event.target.value.trim();
    if (value && (event.key === "Enter" || event.key === ",")) {
      event.preventDefault();
      setAddMetaKeyword([...addMetaKeyword, value]);
      event.target.value = "";
    }
  };
  const RemoveKeyword = (idx) => {
    const newArray = [...addMetaKeyword];
    newArray.splice(idx, 1);
    setAddMetaKeyword(newArray);
  };

  // add meta tags
  const handleTags = (event) => {
    const value = event.target.value.trim();
    if (value && (event.key === "Enter" || event.key === ",")) {
      event.preventDefault();
      setAddMetaTag([...addMetaTag, value]);
      event.target.value = "";
    }
  };
  const RemoveTags = (idx) => {
    const newArray = [...addMetaTag];
    newArray.splice(idx, 1);
    setAddMetaTag(newArray);
  };
  useEffect(() => {
    getActiveCategoryData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Add Product</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Add Product</span>
          </p>
        </div>
        <div className="add_data_form">
          <form method="post" onSubmit={addCategoryData}>
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
                onChange={handleChangeProduct}
                required
              />
            </div>
            <div className="mb-3">
              <p className="modal_label">Product Short Description:-</p>
              <Editor
                apiKey="1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo"
                onInit={(evt, editor) => (editorShortRef.current = editor)}
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
                Product Image:-
              </label>
              <input
                type="file"
                id="product_image"
                name="product_image"
                className="modal_input"
                onChange={handleAddFileChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cate_id" className="modal_label">
                Choose Category:
              </label>
              <select
                name="cate_id"
                id="cate_id"
                form="cate_id"
                className="modal_input"
                onChange={handleChangeProduct}
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
            <hr style={{ marginTop: "40px", marginBottom: "20px" }} />
            <p
              className="modal_label"
              style={{ marginBottom: "20px", fontSize: "16px" }}
            >
              SEO :
            </p>
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
                {addMetaTag.map((tag, index) => (
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
                {addMetaKeyword.map((keyword, index) => (
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
                onChange={handleChangeProduct}
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
                onChange={handleChangeProduct}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="success_btn">
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
        <Toast />
      </section>
    </>
  );
};

export default AddProduct;
