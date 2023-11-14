import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/layouts/Header";
import DeleteModal from "@/layouts/DeleteModal";
import { useRouter } from "next/router";
import Toast, { ErrorToast, SuccessToast } from "@/layouts/toast/Toast";
import Loading from "@/layouts/Loading";

const BlogCategory = () => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [getAllBlogCategory, setGetAllBlogCategory] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/router`)
      .then((res) => {
        setGetAllBlogCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleBlogEdit = (id) => {
    setLoading(true);
    router.push(`/admin/blog-category/edit-blog-category?id=${id}`);
  };

  //edit status
  const catgoryStatusChange = async (cateId, no) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/blogcategory/statuschanges/${cateId}/${no}`
      );
      setLoading(false);
      getAllBlogCategoryData();
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //delete blog category
  const deletBlogCategory = async (cateId) => {
    setLoading(true);
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/blogcategory/${cateId}`)
      .then((res) => {
        setLoading(false);
        getAllBlogCategoryData();
        SuccessToast("Category Deleted Successfully");
      })
      .catch((err) => {
        ErrorToast(err?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllBlogCategoryData();
  }, []);

  const handleViewBlogCategory = (id) => {
    router.push(`/admin/blog-category/view-blog-category?id=${id}`);
  };

  return (
    <>
      {loading && <Loading />}
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
                <th style={{ width: "10%" }}>ID</th>
                <th style={{ width: "30%" }}>TITLE</th>
                <th style={{ width: "20%" }}>IMAGE</th>
                <th style={{ width: "20%" }}>ICON</th>
                <th style={{ width: "15%" }}>OPERATION</th>
                <th style={{ width: "7%" }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {getAllBlogCategory.length > 0 ? (
                getAllBlogCategory.map((category, index) => (
                  <tr key={category.blog_cate_id}>
                    <td>{index + 1}</td>
                    <td>{category.category_title}</td>
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
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
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
                        <button
                          className="operation_btn"
                          onClick={() => {
                            handleViewBlogCategory(category.blog_cate_id);
                          }}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </span>
                    </td>
                    <td>
                      <div>
                        {category.status === 1 ? (
                          <img
                            src={"/assets/images/activeStatus.png"}
                            className="opr_active_btn"
                            onClick={() => {
                              catgoryStatusChange(category.blog_cate_id, 1);
                            }}
                            alt="Active"
                          />
                        ) : (
                          <img
                            src={"/assets/images/inActiveStatus.png"}
                            className="opr_active_btn"
                            onClick={() => {
                              catgoryStatusChange(category.blog_cate_id, 0);
                            }}
                            alt="InActive"
                          />
                        )}
                      </div>
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
        <Toast />

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
