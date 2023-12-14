import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import Link from "next/link";
import Toast, { ErrorToast, WarningToast } from "@/layouts/toast/Toast";

const AllSetting = () => {
  // USESTATE VARIABLE
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
  const [addMultiDocs, setAddMultiDocs] = useState({
    product_docs: [],
  });
  const [allProductDocs, setAllProductDocs] = useState([]);
  const [isDataAdded, setIsDataAdded] = useState(true);
  const [lastAddId, setLastAddId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addProductVedio, setAddProductVedio] = useState({
    vedio_title: "",
    vedio_description: "",
    vedio_link: "",
    vedio_thumbnail: "",
  });

  //ROUTER
  const router = useRouter();

  // product images
  const [allProductImages, setAllProductImages] = useState([]);
  const [allProductVedios, setAllProductVedios] = useState([]);

  // TABS VARIABLE
  const [activeTab, setActiveTab] = useState("general");

  // GET ALL PRODUCT IMAGES FOR SHOWING WHEN ADD IN IMAGES TAB
  const getAllProductImages = async (prodId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productimages/${prodId}`
      );
      setAllProductImages(response.data);
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  // HANDLE TABS
  const showTab = (tabId) => {
    if (
      (tabId === "image" || tabId === "docs" || tabId === "video") &&
      !isDataAdded
    ) {
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
      console.log(response.data);
      setGetActiveCateData(response.data);
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  //EDITOR HANDLE
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
  //END

  //ADD PRODUCT DATA AND PRODUCT HANDLER
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
    router.push("/admin/settings/edit-setting")
  };
  //END OF PRODUCT HANDLER AND ADD PRODUCT

  //LAST ADDED PRODUCT DATA
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
  //END

  // ADD MULTIPLE DOCS AND MULTIPLE DOCS HANDLER

  // get all Docs of product
  const getAllProductDocs = async (prodId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productdocs/${prodId}`
      );
      setAllProductDocs(response.data);
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleAddMultipleDocsChange = async (event) => {
    const files = event.target.files;
    const pdfFiles = Array.from(files).filter(
      (file) => file.type === "application/pdf"
    );

    // Check if any non-PDF files were selected
    const nonPdfFiles = Array.from(files).filter(
      (file) => file.type !== "application/pdf"
    );

    if (nonPdfFiles.length > 0) {
      WarningToast("Only PDF files are taken from given files.");
    }

    const newdocs = Array.from(pdfFiles).map((file) => ({
      file,
      docs_title: "",
    }));
    setAddMultiDocs((prevMultiDocs) => ({
      ...prevMultiDocs,
      product_docs: [...prevMultiDocs.product_docs, ...newdocs],
    }));
  };

  const removeMultiDocs = async (index) => {
    const newDocs = [...addMultiDocs.product_docs];
    newDocs.splice(index, 1);
    setAddMultiDocs((prevMultiDocs) => ({
      ...prevMultiDocs,
      product_docs: newDocs,
    }));
  };

  const handleDocsDetailsChange = (index, field, value) => {
    setAddMultiDocs((prevMultiDocs) => {
      const updatedImages = [...prevMultiDocs.product_docs];
      updatedImages[index][field] = value;
      return {
        ...prevMultiDocs,
        product_docs: updatedImages,
      };
    });
  };

  const saveMultipleDocs = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("product_id", lastAddId.product_id);
      addMultiDocs.product_docs.forEach((docs, index) => {
        formdata.append(`product_docs`, docs.file);
        formdata.append(`docs_title_${index}`, docs.docs_title);
      });
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productdocs/router`,
        formdata
      );
      setLoading(false);
      getAllProductDocs(lastAddId.product_id);
      setAddMultiDocs({ product_docs: [] });
      setActiveTab("docs");
    } catch (error) {
      console.log("Error adding prod images" + error);
      setLoading(false);
    }
  };

  //END DOCS HANDLER AND ADD MULTIPLE DOCS

  // ADD MULTIPLE IMAGES AND MULTIPLE IMAGES HANDLER
  const handleAddMultipleImagesChange = async (event) => {
    const files = event.target.files;

    // Filter out non-image files
    const imageFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    // Check if any non-image files were selected
    const nonImageFiles = Array.from(files).filter(
      (file) => !file.type.startsWith("image/")
    );

    if (nonImageFiles.length > 0) {
      WarningToast("Only image files are taken from given files.");
    }

    const newImages = Array.from(imageFiles).map((file) => ({
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
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productimages/router`,
        formdata
      );
      setLoading(false);
      setAddMultiImages({ product_images: [] });
      getAllProductImages(lastAddId.product_id);
      setActiveTab("video");
    } catch (error) {
      console.log("Error adding prod images" + error);
      setLoading(false);
    }
  };
  //END IMAGES HANDLER AND ADD MULTIPLE IMAGES

  // HANDLE VEDIO DATA
  //EDITOR
  const VedioeditorRef = useRef(null);
  const handleVedioEditorChange = (content, editor) => {
    setAddProductVedio((prevData) => ({
      ...prevData,
      vedio_description: content,
    }));
  };
  //end
  //HANDLE VEDIO CONTENT SAVE
  const handleVedioContentChange = (event) => {
    const { name, value } = event.target;
    setAddProductVedio((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const handleVedioFileChange = (event) => {
    const file = event.target.files[0];
    setAddProductVedio((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
  };

  // GET ALL PRODUCT IMAGES FOR SHOWING WHEN ADD IN IMAGES TAB
  const getAllProductVedios = async (prodId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productvedios/${prodId}`
      );
      setAllProductVedios(response.data);
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  //SAVE VEDIO DATA

  const saveVedios = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    console.log(addProductVedio);
    try {
      const formdata = new FormData();
      formdata.append("product_id", lastAddId.product_id);
      formdata.append("vedio_title", addProductVedio.vedio_title);
      formdata.append("vedio_link", addProductVedio.vedio_link);
      formdata.append("vedio_description", addProductVedio.vedio_description);
      formdata.append("vedio_thumbnail", addProductVedio.vedio_thumbnail);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productvedios/router`,
        formdata
      );
      setLoading(false);
      setAddProductVedio({
        vedio_title: "",
        vedio_link: "",
        vedio_description: "",
        vedio_thumbnail: null,
      });
      getAllProductVedios(lastAddId.product_id);
      setActiveTab("docs");
    } catch (error) {
      console.log("Error adding prod images" + error);
      setLoading(false);
    }
  };

  //END PRODUCT VEDIO SECTION

  //META KEYWORD HANDLER
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
  //END

  //META TAG HANDERS
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
  //END

  // USEEFFECT METHOD
  useEffect(() => {
    getActiveCategoryData();
  }, []);

  return (
    <>
      {/* LOADING SECTION */}
      {loading && <Loading />}

      {/* HOME SECTION */}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Settings</p>
        </div>
        {/* TABS */}
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
                Social Media
              </div>
              <div
                className={`tab ${activeTab === "image" ? "active" : ""}`}
                onClick={() => showTab("image")}
              >
                SEO
              </div>
            </div>
            {activeTab === "general" || activeTab === "seo" ? (
              <button
                className="product_data_save_btn"
                onClick={addProductTableData}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            ) : (
              ""
            )}
          </div>
          {/* GENREL TABS */}
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
                    height: 300,
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
                      accept="image/png, image/jpeg, image/jpg"
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

          {/* SEO TAB */}
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

          {/* IMAGES TAB */}
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
                    accept="image/png, image/jpeg, image/jpg"
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
              <hr style={{ marginTop: "30px", marginBottom: "20px" }} />
              <div className="admin_category_table">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>ID</th>
                      <th style={{ width: "25%" }}>TITLE</th>
                      <th style={{ width: "25%" }}>IMAGE</th>
                      <th style={{ width: "10%" }}>HEIGHT</th>
                      <th style={{ width: "10%" }}>WIDTH</th>
                      <th style={{ width: "20%" }}>Alt TEXT</th>
                      <th style={{ width: "10%" }}>SORT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProductImages.length > 0 ? (
                      allProductImages.map((product, index) => (
                        <tr
                          key={product.product_id}
                          style={{
                            color: product.status === 1 ? "black" : "red",
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>{product.image_title}</td>
                          <td>
                            <img
                              src={`/assets/upload/products/productImages/${product.product_image}`}
                              width="100%"
                              alt="product"
                              className="tabel_data_image"
                            />
                          </td>
                          <td>{product.image_height}</td>
                          <td>{product.image_width}</td>
                          <td>{product.alternative}</td>
                          <td>{product.sort_image}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" align="center">
                          data is not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VEDIO TAB */}
          {isDataAdded && (
            <div
              id="video"
              className={`tab-content add_data_form ${
                activeTab === "video" ? "active" : ""
              }`}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "70%", margin: "20px" }}>
                  {allProductVedios && (
                    <div className="admin_category_table">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "15%" }}>ID</th>
                            <th style={{ width: "15%" }}>TITLE</th>
                            <th style={{ width: "30%" }}>DESCRIPTION</th>
                            <th style={{ width: "15%" }}>THUMBNAIL</th>
                            <th style={{ width: "10%" }}>LINK</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProductVedios.length > 0 ? (
                            allProductVedios.map((product, index) => (
                              <tr
                                key={product.product_id}
                                style={{
                                  color: product.status === 1 ? "black" : "red",
                                }}
                              >
                                <td>{index + 1}</td>
                                <td>{product.video_title}</td>
                                <td>{product.video_description}</td>
                                <td>
                                  <img
                                    src={`/assets/upload/products/productVedios/${product.video_thumbnail}`}
                                    width="100%"
                                    alt="Video Thumbnail"
                                    className="tabel_data_image"
                                  />
                                </td>
                                <td>{product.product_video}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" align="center">
                                data is not available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div style={{ width: "30%" }}>
                  <form method="post" onSubmit={saveVedios}>
                    <div className="mb-3">
                      <label htmlFor="vedio_title" className="modal_label">
                        Video Title:-
                      </label>
                      <input
                        type="text"
                        id="vedio_title"
                        name="vedio_title"
                        className="modal_input"
                        placeholder="Enter Video Title"
                        onChange={handleVedioContentChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <p className="modal_label">Video Description:-</p>
                      <Editor
                        apiKey="1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo"
                        onInit={(evt, editor) =>
                          (VedioeditorRef.current = editor)
                        }
                        init={{
                          height: 300,
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
                        onChange={() =>
                          handleVedioEditorChange(
                            VedioeditorRef.current.getContent()
                          )
                        }
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vedio_link" className="modal_label">
                        Video Link:-
                      </label>
                      <input
                        type="text"
                        id="vedio_link"
                        name="vedio_link"
                        className="modal_input"
                        placeholder="Enter Video Link"
                        onChange={handleVedioContentChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vedio_thumbnail" className="modal_label">
                        Video Image:-
                      </label>
                      <input
                        type="file"
                        id="vedio_thumbnail"
                        name="vedio_thumbnail"
                        className="modal_input"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleVedioFileChange}
                        required
                      />
                    </div>
                    <div
                      className="mb-3"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    ></div>
                    <div className="mb-3">
                      <button type="submit" className="success_btn">
                        SAVE
                      </button>
                      <Link href="/admin/products">
                        <button
                          type="button"
                          className="success_btn cancel_btn"
                        >
                          CANCEL
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* DOCS TAB */}
          {isDataAdded && (
            <div
              id="docs"
              className={`tab-content add_data_form ${
                activeTab === "docs" ? "active" : ""
              }`}
            >
              <form method="post" onSubmit={saveMultipleDocs}>
                <div className="mb-3">
                  <label htmlFor="product_images" className="modal_label">
                    Product Docs:-
                  </label>
                  <input
                    type="file"
                    id="product_images"
                    name="product_images"
                    className="modal_input"
                    accept=".pdf,.png"
                    onChange={handleAddMultipleDocsChange}
                    multiple
                  />
                </div>
                <div
                  className="mb-3"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {addMultiDocs.product_docs &&
                  addMultiDocs.product_docs.length > 0 ? (
                    <table className="multi-images-table">
                      <thead>
                        <tr>
                          <th width="25%">Title</th>
                          <th width="15%">Image</th>
                          <th width="10%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addMultiDocs.product_docs.map((image, index) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                id={`docs_title-${index}`}
                                name="docs_title"
                                placeholder="docs Title"
                                onChange={(e) =>
                                  handleDocsDetailsChange(
                                    index,
                                    "docs_title",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={"/assets/images/pdf-icon.webp"}
                                alt={`Selected productimg ${index + 1}`}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="remove_multi_img_btn"
                                onClick={() => removeMultiDocs(index)}
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
              <hr style={{ marginTop: "30px", marginBottom: "20px" }} />
              <div className="admin_category_table">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>ID</th>
                      <th style={{ width: "25%" }}>TITLE</th>
                      <th style={{ width: "25%" }}>IMAGE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProductDocs.length > 0 ? (
                      allProductDocs.map((product, index) => (
                        <tr
                          key={product.product_id}
                          style={{
                            color: product.status === 1 ? "black" : "red",
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>{product.pdf_title}</td>
                          <td>
                            <img
                              src={`/assets/images/pdf-icon.webp`}
                              width="100%"
                              alt="product"
                              className="tabel_data_image"
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
                          data is not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <Toast />
      </section>
    </>
  );
};

export default AllSetting;
