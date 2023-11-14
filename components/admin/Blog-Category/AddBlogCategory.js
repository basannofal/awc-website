import React, { useState, useRef } from "react";
import axios from "axios";
import Header from "@/layouts/Header";
import { useRouter } from "next/router";
import Link from "next/link";
import Toast, { ErrorToast } from "@/layouts/toast/Toast";
import { Editor } from "@tinymce/tinymce-react";
import Loading from "@/layouts/Loading";

const AddBlogCategory = () => {
  const router = useRouter();
  const [addBlogCategory, setAddBlogCategory] = useState({
    category_title: "",
    category_description: "",
    meta_description: "",
    canonical_url: "",
    category_image: null,
    category_icon: null,
  });
  const [addMetaTag, setAddMetaTag] = useState([]);
  const [addMetaKeyword, setAddMetaKeyword] = useState([]);
  const [loading, setLoading] = useState(false);
  //add blog category
  const handleInputBlogCate = async (event) => {
    const { name, value } = event.target;
    setAddBlogCategory((prevCateData) => ({
      ...prevCateData,
      [name]: value,
    }));
  };
  // Function to handle Enter key press
  const handleMetaTag = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      // Add the entered keyword to the keywords array
      event.preventDefault();
      setAddMetaTag([...addMetaTag, event.target.value]);
      // Clear the input field
      event.target.value = "";
    }
  };

  const RemoveMetaTag = (idx) => {
    const newArray = [...addMetaTag];
    newArray.splice(idx, 1);
    setAddMetaTag(newArray);
  };
  const handleKeyword = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      // Add the entered keyword to the keywords array
      event.preventDefault();
      setAddMetaKeyword([...addMetaKeyword, event.target.value]);
      // Clear the input field
      event.target.value = "";
    }
  };

  const RemoveKeyword = (idx) => {
    const newArray = [...addMetaKeyword];
    newArray.splice(idx, 1);
    setAddMetaKeyword(newArray);
  };

  //editor
  const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    setAddBlogCategory((prevData) => ({
      ...prevData,
      category_description: content,
    }));
  };
  //end

  // file handle
  const handleFileBlogCate = async (event) => {
    const file = event.target.files[0];
    setAddBlogCategory((prevImage) => ({
      ...prevImage,
      [event.target.name]: file,
    }));
  };

  const saveBlogCategory = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category_title", addBlogCategory.category_title);
      // formData.append(
      //   "category_description",
      //   addBlogCategory.category_description
      // );

      formData.append("category_description", editorRef.current.getContent());
      formData.append("meta_tag", addMetaTag);
      formData.append("meta_description", addBlogCategory.meta_description);
      formData.append("meta_keyword", addMetaKeyword);
      formData.append("canonical_url", addBlogCategory.canonical_url);
      formData.append("category_image", addBlogCategory.category_image);
      formData.append("category_icon", addBlogCategory.category_icon);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blogcategory/router`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      setLoading(false);
      getAllBlogCategoryData();
      router.push("/admin/blog-category");
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Add Blog Category</p>
          <p>
            <Link href="/admin/admindashboard">
              <i className="fa-solid fa-house"></i>
            </Link>
            <i className="fa-solid fa-angles-right"></i>
            <span>Add Blog Category</span>
          </p>
        </div>
        <div className="add_data_form">
          <form method="post" onSubmit={saveBlogCategory}>
            <div className="mb-3">
              <label htmlFor="category_title" className="modal_label">
                Category Title:-
              </label>
              <input
                type="text"
                id="category_title"
                name="category_title"
                className="modal_input"
                placeholder="Enter Category Name"
                onChange={handleInputBlogCate}
              />
            </div>

            <div className="mb-3">
              <p className="modal_label">Category Description:-</p>
              <Editor
                apiKey="1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo"
                onInit={(evt, editor) => (editorRef.current = editor)}
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
                onChange={handleEditorChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category_image" className="modal_label">
                Category Image:-
              </label>
              <input
                type="file"
                id="category_image"
                name="category_image"
                className="modal_input"
                onChange={handleFileBlogCate}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category_icon" className="modal_label">
                Category Icon:-
              </label>
              <input
                type="file"
                id="category_icon"
                name="category_icon"
                className="modal_input"
                onChange={handleFileBlogCate}
                required
              />
            </div>
            <hr style={{marginTop:"50px", marginBottom:"20px"}}/>
            <h3  className="modal_label" style={{fontSize:16}}>SEO :</h3>
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
                onKeyDown={handleMetaTag}
              />
            </div>
            <div className="meta_main_section">
              {addMetaTag.map((tag, index) => (
                <div className="mb-3" key={index}>
                  <div className="meta_tag_section">
                    <div className="meta_tag_text">{tag}</div>
                    <div
                      className="meta_remove_icon"
                      onClick={() => {
                        RemoveMetaTag(index);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="meta_main_section">
              {addMetaKeyword.map((keyword, index) => (
                <div className="mb-3" key={index}>
                  <div className="meta_tag_section">
                    <div className="meta_tag_text">{keyword}</div>
                    <div
                      className="meta_remove_icon"
                      onClick={() => {
                        RemoveKeyword(index);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="meta_description" className="modal_label">
                Meta Description:-
              </label>
              <textarea
                type="text"
                rows="5"
                cols="70"
                id="meta_description"
                name="meta_description"
                className="modal_input"
                placeholder="Enter Meta Description"
                onChange={handleInputBlogCate}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="canonical_url" className="modal_label">
                Conanical URL:-
              </label>
              <input
                type="text"
                id="canonical_url"
                name="canonical_url"
                className="modal_input"
                placeholder="Enter Conanical URL"
                onChange={handleInputBlogCate}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="success_btn">
                SAVE
              </button>
              <Link href="/admin/blog-category">
                <button type="button" className="success_btn cancel_btn">
                  CANCEL
                </button>
              </Link>
            </div>
          </form>
        </div>
        <Toast />
      </section>
    </>
  );
};

export default AddBlogCategory;
