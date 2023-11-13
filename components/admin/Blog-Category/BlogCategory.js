import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/layouts/Header";
import DeleteModal from "@/layouts/DeleteModal";
import { useRouter } from "next/router";

const BlogCategory = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [getAllBlogCategory, setGetAllBlogCategory] = useState([]);

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

  const handleBlogEdit = (id) => {
    router.push(`/admin/blog-category/edit-blog-category?id=${id}`);
  };

  //edit status
  const catgoryStatusChange = async (cateId, no) => {
    try {
      const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/statuschanges/${cateId}/${no}`);
      getAllBlogCategoryData();
    } catch (error) {
      console.error("Error updating blog category status data:", error);
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
          <Link href="/admin/blog-category/add-blog-category">
            <button type="button">
              <i className="fa-solid fa-plus"></i>Add Category
            </button>
          </Link>
        </div>
        <div className="admin_category_table">
          <table>
            <thead>
              <tr>
                <th style={{ width: "7%" }}>ID</th>
                <th style={{ width: "15%" }}>TITLE</th>
                <th style={{ width: "30%" }}>DESCRIPTION</th>
                <th style={{ width: "15%" }}>IMAGE</th>
                <th style={{ width: "15%" }}>ICON</th>
                <th style={{ width: "18%" }}>OPERATION</th>
              </tr>
            </thead>
            <tbody>
              {getAllBlogCategory.length > 0 ? (
                getAllBlogCategory.map((category, index) => (
                  <tr key={category.blog_cate_id}>
                    <td>{index + 1}</td>
                    <td>{category.category_title}</td>
                    <td className="blog_desc_col">
                      <span className="blog_truncate_text">
                        {truncateText(category.category_description, 100)}
                      </span>
                      <div className="blog_fullDesc">
                        {category.category_description}
                      </div>
                    </td>
                    <td>
                      <img
                        src={`/assets/upload/blog/${category.category_image}`}
                        width="100%"
                        className="tabel_data_image"
                        alt="category_image"
                      />
                    </td>
                    <td>
                      <img
                        src={`/assets/upload/blog/${category.category_icon}`}
                        width="100%"
                        className="tabel_data_image"
                        alt="category_icon"
                      />
                    </td>
                    <td>
                      <span>
                        <button
                          className="operation_btn"
                          onClick={() => {
                            handleBlogEdit(category.blog_cate_id);
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className="operation_btn operation_delete_btn"
                          onClick={() => openDeleteModal(category.blog_cate_id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>

                        {category.status === 1 ? (
                          <button
                            className="opr_active_btn"
                            onClick={() => {
                              catgoryStatusChange(category.blog_cate_id, 1);
                            }}
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            className="opr_deactive_btn opr_active_btn"
                            onClick={() => {
                              catgoryStatusChange(category.blog_cate_id, 0);
                            }}
                          >
                            Inactive
                          </button>
                        )}
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
