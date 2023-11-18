import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import Link from "next/link";
import Toast, { ErrorToast, WarningToast } from "@/layouts/toast/Toast";

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
  const [addMultiImages, setAddMultiImages] = useState({
    product_images: [],
  });
  const [isDataAdded, setIsDataAdded] = useState(true);
  const [lastAddId, setLastAddId] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // tabs
  const [activeTab, setActiveTab] = useState("general");

  const showTab = (tabId) => {
    if (tabId === "image" && !isDataAdded) {
      WarningToast("Please add the general data");
    } else {
      setActiveTab(tabId);
    }
  };

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
  const addProductTableData = async (e) => {
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

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/router`,
        formdata
      );
      setLoading(false);
      setIsDataAdded(true);
      setActiveTab("image");
      getLastAddedData();
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //get laste added prod data
  const getLastAddedData = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/products/getlastdata/router`)
      .then((res) => {
        setLastAddId(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // add multiple images
  const handleAddMultipleImagesChange = async (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) => ({
      file,
      image_title: "",
      sort_image: "",
      image_width: "",
      image_height: "",
      alternative: "",
    }));
    setAddMultiImages((prevMultiImages) => ({
      ...prevMultiImages,
      product_images: [...prevMultiImages.product_images, ...newImages],
    }));
  };

  const removeMultiImage = async (index) => {
    const newImages = [...addMultiImages.product_images];
    newImages.splice(index, 1);
    setAddMultiImages((prevMultiImages) => ({
      ...prevMultiImages,
      product_images: newImages,
    }));
  };

  const handleImageDetailsChange = (index, field, value) => {
    setAddMultiImages((prevMultiImages) => {
      const updatedImages = [...prevMultiImages.product_images];
      updatedImages[index][field] = value;
      return {
        ...prevMultiImages,
        product_images: updatedImages,
      };
    });
  };

  const saveMultipleImages = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("product_id", lastAddId.product_id);
      addMultiImages.product_images.forEach((image, index) => {
        formdata.append(`product_images`, image.file);
        formdata.append(`image_title_${index}`, image.image_title);
        formdata.append(`sort_image_${index}`, image.sort_image);
        formdata.append(`image_width_${index}`, image.image_width);
        formdata.append(`image_height_${index}`, image.image_height);
        formdata.append(`alternative_${index}`, image.alternative);
      });
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products/productimages/router`, formdata);
      setLoading(false);
      router.push("/admin/products");
    } catch (error) {
      console.log("Error adding prod images" + error);
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
        <div className="tabs-container">
          <div className="tabs">
            <div style={{ display: "flex" }}>
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
            {activeTab === "general" || activeTab === "seo" ? (
              <button
                className="product_data_save_btn"
                onClick={addProductTableData}
              >
                <i className="fa-solid fa-floppy-disk"></i>
              </button>
            ) : (
              ""
            )}
          </div>
          <div
            id="general"
            className={`tab-content add_data_form ${
              activeTab === "general" ? "active" : ""
            }`}
          >
            <form method="post">
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
              <div className="two_input_flex">
                <div style={{ width: "48%" }}>
                  <div className="mb-3">
                    <label htmlFor="product_image" className="modal_label">
                      Product Thumbnail:-
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
                  {addProductData.product_image && (
                    <div className="mb-3">
                      <img
                        src={URL.createObjectURL(addProductData.product_image)}
                        alt="Selected Thumbnail"
                        className="tabel_data_image"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3" style={{ width: "48%" }}>
                  <label htmlFor="cate_id" className="modal_label">
                    Choose Category:*
                  </label>
                  <select
                    name="cate_id"
                    id="cate_id"
                    form="cate_id"
                    className="modal_input"
                    style={{ padding: "10px 8px" }}
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
              </div>
              <div className="mb-3">
                {/* <button type="submit" className="success_btn">
                  SAVE
                </button> */}
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
            <form method="post" onSubmit={addProductTableData}>
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
                <Link href="/admin/products">
                  <button type="button" className="success_btn cancel_btn">
                    CANCEL
                  </button>
                </Link>
              </div>
            </form>
          </div>
          {isDataAdded && (
            <div
              id="image"
              className={`tab-content add_data_form ${
                activeTab === "image" ? "active" : ""
              }`}
            >
              <form method="post" onSubmit={saveMultipleImages}>
                <div className="mb-3">
                  <label htmlFor="product_images" className="modal_label">
                    Product Images:-
                  </label>
                  <input
                    type="file"
                    id="product_images"
                    name="product_images"
                    className="modal_input"
                    onChange={handleAddMultipleImagesChange}
                    multiple
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {addMultiImages.product_images &&
                  addMultiImages.product_images.length > 0 ? (
                    <table className="multi-images-table">
                      <thead>
                        <tr>
                          <th width="25%">Title</th>
                          <th width="15%">Image</th>
                          <th width="10%">Width</th>
                          <th width="10%">Height</th>
                          <th width="20%">Alternative Text</th>
                          <th width="10%">Sort</th>
                          <th width="10%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addMultiImages.product_images.map((image, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                id={`image_title-${index}`}
                                name="image_title"
                                placeholder="Image Title"
                                onChange={(e) =>
                                  handleImageDetailsChange(
                                    index,
                                    "image_title",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={URL.createObjectURL(image.file)}
                                alt={`Selected productimg ${index + 1}`}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                id={`image_width-${index}`}
                                name="image_width"
                                placeholder="Width"
                                onChange={(e) =>
                                  handleImageDetailsChange(
                                    index,
                                    "image_width",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                id={`image_height-${index}`}
                                name="image_height"
                                placeholder="Height"
                                onChange={(e) =>
                                  handleImageDetailsChange(
                                    index,
                                    "image_height",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                id={`alternative-${index}`}
                                name="alternative"
                                placeholder="alternative"
                                onChange={(e) =>
                                  handleImageDetailsChange(
                                    index,
                                    "alternative",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                id={`sort_image-${index}`}
                                name="sort_image"
                                placeholder="sort"
                                onChange={(e) =>
                                  handleImageDetailsChange(
                                    index,
                                    "sort_image",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="remove_multi_img_btn"
                                onClick={() => removeMultiImage(index)}
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No images selected</p>
                  )}
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
          )}
        </div>
        <Toast />
      </section>
    </>
  );
};

export default AddProduct;
