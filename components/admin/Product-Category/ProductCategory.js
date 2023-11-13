import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Header from "@/layouts/Header";
import DeleteModal from "@/layouts/DeleteModal";
import { useRouter } from "next/router";
import Toast, { ErrorToast, SuccessToast } from "@/layouts/toast/Toast";

const ProductCategory = () => {
 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [getCategoryData, setGetCategoryData] = useState([]);
  const [getActiveCateData, setGetActiveCateData] = useState([]);

  const router = useRouter();
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
      deleteProductCategoryData(selectedCategoryId);
      closeDeleteModal();
    }
  };

  //getall catergory data
  const getAllCategoryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/productcategory/router`
      );
      setGetCategoryData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //get active category
  const getActiveCategoryData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/productcategorychanges/router`);
      setGetActiveCateData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  //edit product category data section start
  const handleEditProdCate = (cateId) => {
    router.push(`/admin/product-category/edit-product-category?id=${cateId}`);
  };



  //status edit
  const catgoryStatusChange = async (cateId, no) => {
    const category = getActiveCateData.find(
      (category) => category.sub_category == cateId
    );
    console.log(category);
    if (category) {
      alert("Cannot Deactive this data because it connect each other");
      getAllCategoryData();
      getActiveCategoryData();
    } else {
      try {
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/productcategorychanges/${cateId}/${no}`);
        getAllCategoryData();
        getActiveCategoryData();
      } catch (error) {
        console.error("Error updating category status data:", error);
      }
    }
  };

  //delete product category data section start
  const deleteProductCategoryData = async (deleteId) => {
    const category = getCategoryData.find(
      (category) => category.sub_category === deleteId
    );
    if (category) {
      alert("Cannot delete this data because it connect each other");
    } else {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/productcategory/${deleteId}`
        );
        setIsDeleteModalOpen(false);
        getAllCategoryData();
        getActiveCategoryData();
        SuccessToast("Category Deleted Successfully")
      } catch (err) {
        ErrorToast(err.response.data.message)
      }
    }
  };

  useEffect(() => {
    getAllCategoryData();
    getActiveCategoryData();
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
          <p className="admin_page_header">Product Category</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Product Category</span>
          </p>
        </div>
        <div className="content_add_btn_section">
          <Link href="/admin/product-category/add-product-category">
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
                <th style={{ width: "10%" }}>NAME</th>
                <th style={{ width: "15%" }}>TITLE</th>
                <th style={{ width: "25%" }}>DESCRIPTION</th>
                <th style={{ width: "13%" }}>SUB CATE...</th>
                <th style={{ width: "15%" }}>IMAGE</th>
                <th style={{ width: "20%" }}>OPEARATION</th>
              </tr>
            </thead>
            <tbody>
              {getCategoryData.length > 0 ? (
                getCategoryData.map((category, index) => (
                  <tr key={category.category_id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
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
                      {category.sub_category
                        ? getCategoryData.find(
                            (subCategory) =>
                              subCategory.category_id === category.sub_category
                          )?.category_name
                        : "null"}
                    </td>
                    <td>
                      <img
                        src={`/assets/upload/${category.category_image}`}
                        width="150px"
                        height="150px"
                        alt="profile"
                        className="tabel_data_image"
                      />
                    </td>
                    <td>
                      <span>
                        <button
                          className="operation_btn"
                          // onClick={() => openEditModal(category.category_id)}
                          onClick={() => {
                            handleEditProdCate(category.category_id);
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className="operation_btn operation_delete_btn"
                          onClick={() => openDeleteModal(category.category_id)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        {category.status === 1 ? (
                          <button
                            className="opr_active_btn"
                            onClick={() => {
                              catgoryStatusChange(category.category_id, 1);
                            }}
                          >
                            Active
                          </button>
                        ) : (
                          <button
                            className="opr_deactive_btn opr_active_btn"
                            onClick={() => {
                              catgoryStatusChange(category.category_id, 0);
                            }}
                          >
                            Deactive
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" align="center">
                    data is not available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default ProductCategory;
