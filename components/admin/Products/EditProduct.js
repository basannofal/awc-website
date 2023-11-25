import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Loading from "@/layouts/Loading";
import Header from "@/layouts/Header";
import Link from "next/link";
import Toast, {
  ErrorToast,
  SuccessToast,
  WarningToast,
} from "@/layouts/toast/Toast";
import DeleteModal from "@/layouts/DeleteModal";

const EditProduct = () => {
  const router = useRouter();
  let prodId = router.query.id;

  // USESTATE VARIABLE
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
  const [addMultiImages, setAddMultiImages] = useState({
    product_images: [],
  });
  const [addMultiDocs, setAddMultiDocs] = useState({
    product_docs: [],
  });
  const [allProductImages, setAllProductImages] = useState([]);
  const [allProductDocs, setAllProductDocs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productImgId, setproductImgId] = useState(null);
  const [deleteopt, setDeleteopt] = useState("");
  
  const [addProductVedio, setAddProductVedio] = useState({
    vedio_title: "",
    vedio_description: "",
    vedio_link: "",
    vedio_thumbnail: "",
  });
  const [allProductVedios, setAllProductVedios] = useState([]);

  //TABS HANDLER
  const [activeTab, setActiveTab] = useState("general");

  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  //DELETE MODAL HANDLER
  const openDeleteModal = (prodId, opt) => {
    setproductImgId(prodId);
    setDeleteopt(opt);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setproductImgId(null);
    setIsDeleteModalOpen(false);
  };
  const deleteCategory = () => {
    if (productImgId) {
      if (deleteopt == "image") {
        deleteProductImg(productImgId);
      } else if ("docs") {
        deleteProductdocs(productImgId);
      }
      closeDeleteModal();
    }
  };
  // END DELETE MODAL HANDLER

  // GET ACTIVE CATEGORY
  const getActiveCategoryData = async () => {
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

  //GET PRODUCT DATA WHICH IS SELECT FOR EDIT
  const getProductCategoryForEdit = async (prodId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${prodId}`
      );
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

  //EDITOR
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
      formdata.append("cate_id", editProductData?.cate_id);
      formdata.append("product_title", editProductData?.product_title);
      formdata.append(
        "product_short_desc",
        editProductData?.product_short_desc
      );
      formdata.append("product_long_desc", editProductData?.product_long_desc);
      formdata.append("meta_tag", editMetaTag);
      formdata.append("meta_desc", editProductData?.meta_desc);
      formdata.append("meta_keyword", editMetaKeyword);
      formdata.append("canonical_url", editProductData?.canonical_url);
      formdata.append("product_image", editProductData?.product_image);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${prodId}`,
        formdata
      );
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

  // USEEFFECT METHOD
  useEffect(() => {
    getActiveCategoryData();
    getProductCategoryForEdit(prodId);
    getAllProductImages();
    getAllProductDocs();
    getAllProductVedios();
  }, [prodId]);

  ///  **************** ALL DOCS ******************

  // get all Docs of product
  const getAllProductDocs = async () => {
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

  // ADD MULTIPLE DOCS AND MULTIPLE DOCS HANDLER
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
    console.log(addMultiDocs);
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
    console.log(allProductDocs);
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("product_id", prodId);
      addMultiDocs.product_docs.forEach((docs, index) => {
        formdata.append(`product_docs`, docs.file);
        formdata.append(`docs_title_${index}`, docs.docs_title);
      });
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productdocs/router`,
        formdata
      );
      setLoading(false);
      setAddMultiDocs({ product_docs: [] });
      getAllProductDocs();
      SuccessToast("Docs Added Successfully");
    } catch (error) {
      console.log("Error adding prod images" + error);
      setLoading(false);
    }
  };

  // DELETE DOCS
  const deleteProductdocs = async (deleteId) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productdocs/${deleteId}`
      );
      getAllProductDocs();
      setLoading(false);
      SuccessToast("Product Docs Deleted Successfully");
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  // PRODUCT STATUS CHANGE
  const productDocsStatusChange = async (docId, no) => {
    setLoading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productdocs/statuschanges/${docId}/${no}`
      );
      getAllProductDocs();
      setLoading(false);
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //END DOCS HANDLER AND ADD MULTIPLE DOCS

  ///  **************** END DOCS ******************

  ///  **************** ALL IMAGES SECTION ******************

  // get all images of product
  const getAllProductImages = async () => {
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

  // edit multiple images

  const saveMultipleImages = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    console.log(addMultiImages);
    try {
      const formdata = new FormData();
      formdata.append("product_id", prodId);
      addMultiImages.product_images.forEach((image, index) => {
        console.log(image);
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
      getAllProductImages();
      setAddMultiImages({ product_images: [] });
    } catch (error) {
      console.log("Error adding prod images" + error);
      setLoading(false);
    }
  };

  //status edit
  const productImageStatusChange = async (imgId, no) => {
    setLoading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productimages/statuschanges/${imgId}/${no}`
      );
      getAllProductImages();
      setLoading(false);
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //handle images
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

  // DELETE IMAGE
  const deleteProductImg = async (deleteId) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/productimages/${deleteId}`
      );
      getAllProductImages();
      setLoading(false);
      SuccessToast("Product Image Deleted Successfully");
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  ///  **************** END IMAGES SECTION ******************


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
  const getAllProductVedios = async () => {
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
      formdata.append("product_id", prodId);
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
      getAllProductVedios();
      setActiveTab("docs");
    } catch (error) {
      console.log("Error adding prod images" + error);
      setLoading(false);
    }
  };

  //END PRODUCT VEDIO SECTION


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
              <div
                className={`tab ${activeTab === "video" ? "active" : ""}`}
                onClick={() => showTab("video")}
              >
                Videos
              </div>
              <div
                className={`tab ${activeTab === "docs" ? "active" : ""}`}
                onClick={() => showTab("docs")}
              >
                Docs
              </div>
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
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleEditFileChange}
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
                      <option
                        selected={cate.category_id == editProductData?.cate_id}
                        key={cate.category_id}
                        value={cate.category_id}
                      >
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
                    saveEditProductData(editProductData?.product_id);
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
                    saveEditProductData(editProductData?.product_id);
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
                    <th style={{ width: "10%" }}>OPERATION</th>
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
                        <td
                          style={{
                            paddingTop: "0px",
                            paddingBottom: "10px",
                            textAlign: "end",
                          }}
                        >
                          <span>
                            <button
                              className="editbutton"
                              onClick={() => {
                                handleEditProduct(product.product_id);
                              }}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                          </span>
                          <label className="dropdown">
                            <div className="dd-button"></div>
                            <input
                              type="checkbox"
                              className="dd-input"
                              id="test"
                            />
                            <ul className="dd-menu">
                              <li
                                onClick={() =>
                                  openDeleteModal(
                                    product.prod_image_id,
                                    "image"
                                  )
                                }
                              >
                                Delete
                              </li>
                              <li>
                                {" "}
                                {product.status === 1 ? (
                                  <button
                                    onClick={() => {
                                      productImageStatusChange(
                                        product.prod_image_id,
                                        1
                                      );
                                    }}
                                  >
                                    Active
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      productImageStatusChange(
                                        product.prod_image_id,
                                        0
                                      );
                                    }}
                                  >
                                    Inactive
                                  </button>
                                )}
                              </li>
                            </ul>
                          </label>
                        </td>
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

          {/* Vedio Tabs */}
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
                      Vedio Title:-
                    </label>
                    <input
                      type="text"
                      id="vedio_title"
                      name="vedio_title"
                      className="modal_input"
                      placeholder="Enter Vedio Title"
                      onChange={handleVedioContentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <p className="modal_label">Vedio Description:-</p>
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
                      Vedio Link:-
                    </label>
                    <input
                      type="text"
                      id="vedio_link"
                      name="vedio_link"
                      className="modal_input"
                      placeholder="Enter Vedio Link"
                      onChange={handleVedioContentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="vedio_thumbnail" className="modal_label">
                      vedio Image:-
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
                      <button type="button" className="success_btn cancel_btn">
                        CANCEL
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Docs Tabs */}
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
                    <th style={{ width: "10%" }}>OPERATION</th>
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
                        <td
                          style={{
                            paddingTop: "0px",
                            paddingBottom: "10px",
                            textAlign: "end",
                          }}
                        >
                          <span>
                            <button
                              className="editbutton"
                              onClick={() => {
                                handleEditProduct(product.product_id);
                              }}
                            >
                              <i className="fa-regular fa-pen-to-square"></i>
                            </button>
                          </span>
                          <label className="dropdown">
                            <div className="dd-button"></div>
                            <input
                              type="checkbox"
                              className="dd-input"
                              id="test"
                            />
                            <ul className="dd-menu">
                              <li
                                onClick={() =>
                                  openDeleteModal(product.prod_docs_id, "docs")
                                }
                              >
                                Delete
                              </li>
                              <li>
                                {" "}
                                {product.status === 1 ? (
                                  <button
                                    onClick={() => {
                                      productDocsStatusChange(
                                        product.prod_docs_id,
                                        1
                                      );
                                    }}
                                  >
                                    Active
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      productDocsStatusChange(
                                        product.prod_docs_id,
                                        0
                                      );
                                    }}
                                  >
                                    Inactive
                                  </button>
                                )}
                              </li>
                            </ul>
                          </label>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" align="center">
                        data is not available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={deleteCategory}
        />
        <Toast />
      </section>
    </>
  );
};

export default EditProduct;
