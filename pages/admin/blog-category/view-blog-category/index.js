import ViewBlogCategory from "@/components/admin/Blog-Category/ViewBlogCategory";
 import Sidebar from "@/layouts/Sidebar";
import React from "react";

const index = () => {
  return (
    <>
      <Sidebar />
      <ViewBlogCategory />
    </>
  );
};

export default index;
