import Header from "@/layouts/Header";
import Link from "next/link";
import React from "react";

const Blogs = () => {
  return (
    <>
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
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
          <button type="button">
            <i className="fa-solid fa-plus"></i>Add Blog
          </button>
        </div>
        <div className="admin_category_table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>ICON</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Blogs;
