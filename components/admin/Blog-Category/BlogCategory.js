import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/layouts/Header";
import DeleteModal from "@/layouts/DeleteModal";

const BlogCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [getAllBlogCategory, setGetAllBlogCategory] = useState([]);
  const [addBlogCategory, setAddBlogCategory] = useState({
    category_title: "",
    category_description: "",
    category_image: null,
    category_icon: null,
  });
  const [editBlogCategory, setEditBlogCategory] = useState({
    category_title: "",
    category_description: "",
    category_image: null,
    category_icon: null,
  });

  //edit & add modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openEditModal = (cateId) => {
    getEditBlogCategory(cateId);
    setIsEditModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  //delete modal
  const openDeleteModal = (brandId) => {
    setSelectedCategoryId(brandId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedCategoryId(null);
    setIsDeleteModalOpen(false);
  };
  const deleteCategory = () => {
    if (selectedCategoryId) {
      deletBlogCategory(selectedCategoryId);
      closeDeleteModal();
    }
  };

  //get blog category
  const getAllBlogCategoryData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/router`)
      .then((res) => {
        setGetAllBlogCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add blog category
  const handleInputBlogCate = async (event) => {
    const { name, value } = event.target;
    setAddBlogCategory((prevCateData) => ({
      ...prevCateData,
      [name]: value,
    }));
  };
  const handleFileBlogCate = async (event) => {
    const file = event.target.files[0];
    setAddBlogCategory((prevImage) => ({
      ...prevImage,
      [event.target.name]: file,
    }));
  };
  const saveBlogCategory = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("category_title", addBlogCategory.category_title);
        formData.append(
          "category_description",
          addBlogCategory.category_description
        );
        formData.append("category_icon", addBlogCategory.category_icon);
        formData.append("category_image", addBlogCategory.category_image);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/router`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
        },
      });
      console.log(res);
      closeModal();
      getAllBlogCategoryData();
      const form = e.target;
      form.reset();
      setAddBlogCategory({
        category_title: "",
        category_description: "",
        category_image: null,
        category_icon: null,
      });
    } catch (error) {
      console.error("Error adding Alumniprofile data in Profile.js:", error);
    }
  };

  //editBlogCateory
  const getEditBlogCategory = async (cateId) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`)
      .then((res) => {
        setEditBlogCategory(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditCategory = async (event) => {
    const { name, value } = event.target;
    setEditBlogCategory((prevCateData) => ({
      ...prevCateData,
      [name]: value,
    }));
  };
  const handleEditFileChange = async (event) => {
    const file = event.target.files[0];
    setEditBlogCategory((prevImage) => ({
      ...prevImage,
      [event.target.name]: file,
    }));
  };
  const saveEditCategory = async (cateId) => {
    console.log(cateId);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`,
        editBlogCategory,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      closeEditModal();
      getAllBlogCategoryData();
    } catch (error) {
      console.error("Error updating blog category:", error);
    }
  };

  //delete blog category
  const deletBlogCategory = async (cateId) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`)
      .then((res) => {
        getAllBlogCategoryData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBlogCategoryData();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <>
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Blog Category</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Blog Category</span>
          </p>
        </div>
        <div className="content_add_btn_section">
          <button type="button" onClick={openModal}>
            <i className="fa-solid fa-plus"></i>Add Category
          </button>
        </div>
        <div className="admin_category_table">
          <table>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: "20%" }}>TITLE</th>
                <th style={{ width: "30%" }}>DESCRIPTION</th>
                <th style={{ width: "20%" }}>IMAGE</th>
                <th style={{ width: "20%" }}>ICON</th>
              </tr>
            </thead>
            <tbody>
              {getAllBlogCategory.length > 0 ? (
                getAllBlogCategory.map((category) => (
                  <tr className="trr" key={category.blog_cate_id}>
                    <td>{category.blog_cate_id}</td>
                    <td>{category.category_title}</td>
                    {/* <td>{category.category_description}</td> */}
                    <td className="blog_desc_col">
                      <span className="blog_truncate_text">
                        {truncateText(category.category_description, 100)}
                      </span>
                      <div className="blog_fullDesc">{category.category_description}</div>
                    </td>
                    <td>
                      <img
                        src={`/assets/upload/blog/${category.category_image}`}
                        width="150px" height="150px"
                        className="tabel_data_image"
                        alt="category_image"
                      />
                    </td>
                    <td>
                      <img
                        src={`/assets/upload/blog/${category.category_icon}`}
                        width="150px" height="150px"
                        className="tabel_data_image"
                        alt="category_icon"
                      />
                      <span>
                        <button
                          className="operation_btn"
                          onClick={() => {
                            openEditModal(category.blog_cate_id);
                          }}
                        >
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button
                          className="operation_btn operation_delete_btn"
                          onClick={() => openDeleteModal(category.blog_cate_id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </span>
                    </td>
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

        {/* add modal start */}
        <div
          className={`add_modal ${isModalOpen ? "open" : "add_modal_close"}`}
        >
          <div className="add_modal-content">
            <h2>Add Category</h2>
            <button
              type="button"
              className="modal_close_btn"
              onClick={closeModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
              <form
                method="post"
                encType="multipart/form-data"
                onSubmit={saveBlogCategory}
              >
                <div className="mb-3">
                  <label htmlFor="category_title" className="modal_label">
                    Blog Category Title:-
                  </label>
                  <input
                    type="text"
                    id="category_title"
                    name="category_title"
                    className="modal_input"
                    placeholder="Enter Blog Category Title"
                    onChange={handleInputBlogCate}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category_description" className="modal_label">
                    Blog Category Description:-
                  </label>
                  <textarea
                    type="text"
                    rows="5"
                    cols="70"
                    id="category_description"
                    name="category_description"
                    className="modal_input"
                    placeholder="Enter Blog Category Description"
                    onChange={handleInputBlogCate}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category_image" className="modal_label">
                    Blog Category Image:-
                  </label>
                  <input
                    type="file"
                    id="category_image"
                    name="category_image"
                    className="modal_input"
                    onChange={handleFileBlogCate}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category_icon" className="modal_label">
                    Blog Category Icon:-
                  </label>
                  <input
                    type="file"
                    id="category_icon"
                    name="category_icon"
                    className="modal_input"
                    onChange={handleFileBlogCate}
                  />
                </div>
                <div className="mb-3">
                  <button type="submit" className="success_btn">
                    SAVE
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="success_btn cancel_btn"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* add modal end */}

        {/* edit modal start */}
        <div className={`add_modal ${isEditModalOpen ? "open" : ""}`}>
          <div className="add_modal-content">
            <h2>EDIT Category</h2>
            <button
              type="button"
              className="modal_close_btn"
              onClick={closeEditModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div>
              <form
                encType="multipart/form-data"
                onSubmit={() => saveEditCategory(editBlogCategory.blog_cate_id)}
              >
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
                    value={editBlogCategory.category_title}
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
                    value={editBlogCategory.category_description}
                    placeholder="Enter Category Description"
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
                    src={`/assets/upload/blog/${editBlogCategory.category_image}`}
                    width="150px" height="150px"
                    className="tabel_data_image"
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
                    src={`/assets/upload/blog/${editBlogCategory.category_icon}`}
                    width="150px" height="150px"
                    className="tabel_data_image"
                    alt="category_icon"
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="success_btn"
                    type="button"
                    onClick={() =>
                      saveEditCategory(editBlogCategory.blog_cate_id)
                    }
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    className="success_btn cancel_btn"
                    onClick={closeEditModal}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* edit modal end */}

        {/* delete modal */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={deleteCategory}
        />
      </section>
    </>
  );
};

export default BlogCategory;