import React from "react";
import Link from "next/link";
import Header from "@/layouts/Header";

const Dashboard = () => {
  return (
    <>
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Dashboard</p>
          <p>
            <Link href="/admin/dashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Dashboard</span>
          </p>
        </div>
        <div className="dashboard-cards">
          <div className="dashboard-card card1">
            <div className="card-header">
              <p>Product Category</p>
            </div>
            <div className="card-body">
              <i className="fa-brands fa-product-hunt"></i>
              <h3>Product Cate...</h3>
              <p>$1,234,567</p>
            </div>
            <div className="card-footer">
              <Link href="/admin/products-category">View Detail...</Link>
            </div>
          </div>
          <div className="dashboard-card card2">
            <div className="card-header">
              <i className="fa-brands fa-product-hunt"></i>
            </div>
            <div className="card-body">
              <h3>Products</h3>
              <p>3</p>
            </div>
            <div className="card-footer">
              <Link href="/admin/admindashboard">View Detail</Link>
            </div>
          </div>
          <div className="dashboard-card card3">
            <div className="card-header">
              <i className="fa-solid fa-blog"></i>
            </div>
            <div className="card-body">
              <h3>Blog Categories</h3>
              <p>1,234</p>
            </div>
            <div className="card-footer">
              <Link href="/admin/blog-category">View Detail</Link>
            </div>
          </div>
          <div className="dashboard-card card4">
            <div className="card-header">
              <i className="fa-solid fa-blog"></i>
            </div>
            <div className="card-body">
              <h3>Blogs</h3>
              <p>567</p>
            </div>
            <div className="card-footer">
              <Link href="/admin/blogs">View Detail</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
