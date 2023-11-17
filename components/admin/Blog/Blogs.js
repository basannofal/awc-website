import DeleteModal from "@/layouts/DeleteModal";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Blogs = () => {
  
  const router = useRouter();
  const [filterdBlog, setFilterdBlog] = useState([]);
  const [getAllBlog, setGetAllBlog] = useState([]);
  const [getCategoryData, setGetCategoryData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  
  return (
    <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <div className="page_top_left_section">
            <p className="admin_page_header">Blogs</p>
            <p>
              <Link href="/admin/admindashboard">
                <i className="fa-solid fa-house"></i>
              </Link>
              <i className="fa-solid fa-angles-right"></i>
              <span>Blogs</span>
            </p>
          </div>
          <div className="content_add_btn_section">
            <Link href="/admin/Blogs/add-Blog">
              <button type="button">
                <i className="fa-solid fa-plus"></i>Add Blog
              </button>
            </Link>
          </div>
        </div>

        <div className="admin_category_table">
          <table>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>ID</th>
                <th style={{ width: "30%" }}>TITLE</th>
                <th style={{ width: "25%" }}>IMAGE</th>
                <th style={{ width: "20%" }}>CATEGORY</th>
                <th style={{ width: "10%" }}>OPERATION</th>
              </tr>
            </thead>
            <tbody>
              {/* {getAllBlog.length > 0 ? (
                getAllBlog.map((Blog, index) => (
                  <tr
                    key={Blog.Blog_id}
                    style={{ color: Blog.status === 1 ? "black" : "red" }}
                  >
                    <td>{index + 1}</td>
                    <td>{Blog.Blog_title}</td>
                    <td>
                      <img
                        src={`/assets/upload/Blogs/${Blog.Blog_image}`}
                        width="100%"
                        alt="Blog"
                        className="tabel_data_image"
                      />
                    </td>
                    <td>
                      {Blog.cate_id
                        ? getCategoryData.find(
                            (category) =>
                              category.category_id === Blog.cate_id
                          )?.category_name
                        : "null"}
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
                            handleEditBlog(Blog.Blog_id);
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                      </span>
                      <label className="dropdown">
                        <div className="dd-button"></div>
                        <input type="checkbox" className="dd-input" id="test" />
                        <ul className="dd-menu">
                          <li
                            onClick={() => openDeleteModal(Blog.Blog_id)}
                          >
                            Delete
                          </li>
                          <li
                            onClick={() => {
                              handleViewBlog(Blog.Blog_id);
                            }}
                          >
                            View
                          </li>
                          <li>Add Images</li>
                          <li>
                            {" "}
                            {Blog.status === 1 ? (
                              <button
                                onClick={() => {
                                  BlogStatusChange(Blog.Blog_id, 1);
                                }}
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  BlogStatusChange(Blog.Blog_id, 0);
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
                  <td colSpan="5" align="center">
                    data is not available
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
        {/* delete modal */}
        {/* <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={deleteCategory}
        /> */}
      </section>
    </>
  );
};

export default Blogs;
