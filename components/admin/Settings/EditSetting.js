import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import Link from "next/link";
import Toast, { ErrorToast, WarningToast } from "@/layouts/toast/Toast";

const EditSetting = () => {
  // USESTATE VARIABLE
  // Genral Tab
  const [generalData, setGeneralData] = useState({
    email: "",
    number: "",
    username: "",
    password: "",
    favicon: null,
    logo: null,
  });
  const [settingImg, setSettingImg] = useState({
    favicon: null,
    logo: null,
  });

  const [activeTab, setActiveTab] = useState("general");

  //Soceal Media Tab

  //SEO Tab
  const [addMetaTag, setAddMetaTag] = useState([]);
  const [addMetaKeyword, setAddMetaKeyword] = useState([]);

  const [isDataAdded, setIsDataAdded] = useState(true);
  const [loading, setLoading] = useState(false);

  //ROUTER
  const router = useRouter();

  // HANDLE TABS
  const showTab = (tabId) => {
    if (
      (tabId === "image" || tabId === "docs" || tabId === "video") &&
      !isDataAdded
    ) {
      WarningToast("Please add the general data");
    } else {
      setActiveTab(tabId);
    }
  };

  //EDITOR HANDLE
  const editorShortRef = useRef(null);
  const handleShortEditorChange = (content, editor) => {
    setGeneralData((prevData) => ({
      ...prevData,
      product_short_desc: content,
    }));
  };
  //END

  //ADD PRODUCT DATA AND PRODUCT HANDLER
  const handleChangeProduct = (event) => {
    const { name, value } = event.target;
    setGeneralData((prevContData) => ({
      ...prevContData,
      [name]: value,
    }));
  };
  const handleAddFileChange = (event) => {
    const file = event.target.files[0];
    setGeneralData((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
    setSettingImg((prevProfileData) => ({
      ...prevProfileData,
      [event.target.name]: file,
    }));
  };
  const addProductTableData = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("cate_id", generalData.cate_id);
      formdata.append("product_title", generalData.product_title);
      formdata.append("product_short_desc", generalData.product_short_desc);
      formdata.append("product_long_desc", generalData.product_long_desc);
      formdata.append("meta_desc", generalData.meta_desc);
      formdata.append("canonical_url", generalData.canonical_url);
      formdata.append("favicon", generalData.favicon);
      formdata.append("meta_tag", addMetaTag);
      formdata.append("meta_keyword", addMetaKeyword);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products/router`,
        formdata
      );
      setLoading(false);
      setIsDataAdded(true);
      setActiveTab("image");
      getLastAddedData();
    } catch (error) {
      console.log("object");
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };
  //END OF PRODUCT HANDLER AND ADD PRODUCT

  //META KEYWORD HANDLER
  const handleKeyword = (event) => {
    const value = event.target.value.trim();
    if (value && (event.key === "Enter" || event.key === ",")) {
      event.preventDefault();
      setAddMetaKeyword([...addMetaKeyword, value]);
      event.target.value = "";
    }
  };
  const RemoveKeyword = (idx) => {
    const newArray = [...addMetaKeyword];
    newArray.splice(idx, 1);
    setAddMetaKeyword(newArray);
  };
  //END

  //META TAG HANDERS
  const handleTags = (event) => {
    const value = event.target.value.trim();
    if (value && (event.key === "Enter" || event.key === ",")) {
      event.preventDefault();
      setAddMetaTag([...addMetaTag, value]);
      event.target.value = "";
    }
  };
  const RemoveTags = (idx) => {
    const newArray = [...addMetaTag];
    newArray.splice(idx, 1);
    setAddMetaTag(newArray);
  };
  //END

  // ADD GENERAL DATA
  const AddGeneralData = async (e) => {
    e.preventDefault();
    window.scrollTo({ behavior: "smooth", top: 0 });
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("email", generalData.email);
      formdata.append("number", generalData.number);
      formdata.append("username", generalData.username);
      formdata.append("password", generalData.password);
      formdata.append("favicon", generalData.favicon);
      formdata.append("logo", generalData.logo);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/${1}`,
        formdata
      );
      setLoading(false);
      router.push("/admin/settings")
    } catch (error) {
      console.log("object");
      ErrorToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  //get active category
  const getGeneralData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/router`
      );
      console.log(response.data);
      setGeneralData({
        email: response.data[0].email,
        number: response.data[0].number,
        username: response.data[0].username,
        password: response.data[0].password,
        favicon: response.data[0].favicon,
        logo: response.data[0].logo,
      });
      setLoading(false);
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeneralData();
  }, []);

  return (
    <>
      {/* LOADING SECTION */}
      {loading && <Loading />}

      {/* HOME SECTION */}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Edit Setting</p>
        </div>
        {/* TABS */}
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
                className={`tab ${
                  activeTab === "social-media" ? "active" : ""
                }`}
                onClick={() => showTab("social-media")}
              >
                Social Media
              </div>
              <div
                className={`tab ${activeTab === "seo" ? "active" : ""}`}
                onClick={() => showTab("seo")}
              >
                SEO
              </div>
            </div>
          </div>
          {/* GENREL TABS */}
          <div
            id="general"
            className={`tab-content add_data_form ${
              activeTab === "general" ? "active" : ""
            }`}
          >
            <form method="post" onSubmit={AddGeneralData}>
              <div className="mb-3">
                <label htmlFor="email" className="modal_label">
                  Email :-
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="modal_input"
                  placeholder="Enter Email"
                  onChange={handleChangeProduct}
                  value={generalData.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="number" className="modal_label">
                  Contact Number :-
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  className="modal_input"
                  placeholder="Enter Contact Number"
                  onChange={handleChangeProduct}
                  value={generalData.number}
                />
              </div>

              <div className="mb-3">
                <div className="two_input_flex">
                  <div style={{ width: "48%" }}>
                    <label htmlFor="favicon" className="modal_label">
                      Favicon:-
                    </label>
                  </div>
                  <div style={{ width: "48%" }}>
                    <label htmlFor="favicon" className="modal_label">
                      Preview
                    </label>
                  </div>
                </div>
                <div className="two_input_flex">
                  <div style={{ width: "48%" }}>
                    <input
                      type="file"
                      id="favicon"
                      name="favicon"
                      className="modal_input"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleAddFileChange}
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <div>
                      {settingImg.favicon ? (
                        <img
                          src={URL.createObjectURL(settingImg.favicon)}
                          width="100px"
                          height="100px"
                          alt="profile"
                        />
                      ) : (
                        <img
                          src={`/assets/upload/setting/${generalData.favicon}`}
                          width="100px"
                          height="100px"
                          alt="Add Favicon"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="two_input_flex">
                  <div style={{ width: "48%" }}>
                    <label htmlFor="logo" className="modal_label">
                      Logo:-
                    </label>
                  </div>
                  <div style={{ width: "48%" }}>
                    <label htmlFor="Preview" className="modal_label">
                      Preview
                    </label>
                  </div>
                </div>
                <div className="two_input_flex">
                  <div style={{ width: "48%" }}>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      className="modal_input"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleAddFileChange}
                    />
                  </div>
                  <div style={{ width: "48%" }}>
                    <div>
                      {settingImg.logo ? (
                        <img
                          src={URL.createObjectURL(settingImg.logo)}
                          width="100px"
                          height="100px"
                          alt="profile"
                        />
                      ) : (
                        <img
                          src={`/assets/upload/setting/${generalData.logo}`}
                          width="100px"
                          height="100px"
                          alt="Add Logo"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="modal_label">
                  Username :-
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="modal_input"
                  placeholder="Enter Username"
                  onChange={handleChangeProduct}
                  value={generalData.username}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="modal_label">
                  Password :-
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="modal_input"
                  placeholder="Enter Password"
                  onChange={handleChangeProduct}
                  value={generalData.password}
                  required
                />
              </div>

              {/* <div className="mb-3">
                <p className="modal_label">Product Short Description:-</p>
                <Editor
                  apiKey="1ufup43ij0id27vrhewjb9ez5hf6ico9fpkd8qwsxje7r5bo"
                  onInit={(evt, editor) => (editorShortRef.current = editor)}
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
                  onChange={(e) =>
                    handleShortEditorChange(editorShortRef.current.getContent())
                  }
                  required
                />
              </div> */}
              <div className="mt-5">
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

          {/* social-media TAB */}
          <div
            id="social-media"
            className={`tab-content add_data_form ${
              activeTab === "social-media" ? "active" : ""
            }`}
          >
            <form method="post" onSubmit={addProductTableData}>
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
                  {addMetaTag.map((tag, index) => (
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
                  {addMetaKeyword.map((keyword, index) => (
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
                  onChange={handleChangeProduct}
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
                  onChange={handleChangeProduct}
                />
              </div>
              <div className="mb-3">
                <Link href="/admin/products">
                  <button type="button" className="success_btn cancel_btn">
                    CANCEL
                  </button>
                </Link>
              </div>
            </form>
          </div>

          {/* SEO TAB */}
          <div
            id="seo"
            className={`tab-content add_data_form ${
              activeTab === "seo" ? "active" : ""
            }`}
          >
            <form method="post" onSubmit={addProductTableData}>
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
                  {addMetaTag.map((tag, index) => (
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
                  {addMetaKeyword.map((keyword, index) => (
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
                  onChange={handleChangeProduct}
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
                  onChange={handleChangeProduct}
                />
              </div>
              <div className="mb-3">
                <Link href="/admin/products">
                  <button type="button" className="success_btn cancel_btn">
                    CANCEL
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <Toast />
      </section>
    </>
  );
};

export default EditSetting;
