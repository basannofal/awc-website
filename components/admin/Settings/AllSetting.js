import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";
import Header from "@/layouts/Header";
import Loading from "@/layouts/Loading";
import Link from "next/link";
import Toast, { ErrorToast, WarningToast } from "@/layouts/toast/Toast";

const AllSetting = () => {
  const [userData, setUserData] = useState([]);
  const [settingData, setSettingData] = useState([]);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  // HANDLE TABS
  const showTab = (tabId) => {
    setActiveTab(tabId);
  };
  //FOR PUSHING EDIT PAGE

  const router = useRouter();
  const addProductTableData = async (e) => {
    e.preventDefault();
    router.push("/admin/settings/edit-setting")
  };

  //ALL USER DATA GETTING
  const getAllUserData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/settings/router`)
      .then((res) => {
        setUserData(res.data[0]);
        console.log(res.data[0])
        console.log("object")
        setLoading(false);
      })
      .catch((err) => {
        ErrorToast(err?.response?.data?.message);
        setLoading(false);
      });
  };
  const getAllSettingData = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/settings/social/router`)
      .then((res) => {
        setSettingData(res.data[0]);
        console.log(res.data[0])
        console.log("object")
        setLoading(false);
      })
      .catch((err) => {
        ErrorToast(err?.response?.data?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllUserData();
    getAllSettingData();
  }, [])


  return (
    <>
      {/* LOADING SECTION */}
      {/* {<Loading />} */}

      {/* HOME SECTION */}
      <section className="home-section">
        <Header />
        <div className="admin_page_top">
          <p className="admin_page_header">Settings</p>
          {activeTab === "general" || activeTab === "social-media" ? (
            <button
              className="product_data_save_btn"
              onClick={addProductTableData}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
          ) : (
            ""
          )}
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
                className={`tab ${activeTab === "social-media" ? "active" : ""}`}
                onClick={() => showTab("social-media")}
              >
                Social Media
              </div>
            </div>
          </div>
          {/* GENREL TABS */}
          <div
            id="general"
            className={`tab-content add_data_form ${activeTab === "general" ? "active" : ""
              }`}
          >
            <div className="mb-3">
              <label htmlFor="Email" className="modal_label_setting">
                Email:-
              </label>
              <p className="mt-1">{userData && userData.email}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="modal_label_setting">
                Contact Number:-
              </label>
              <p className="mt-1">{userData && userData.number}</p>
            </div>
            <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgb(209, 201, 201)" }} className="mb-3">
              <label htmlFor="preview" className="modal_label_setting">
                Favicon
              </label>
              <div>
                <img
                  src={`/assets/upload/setting/${userData.favicon}`}
                  width="100px"
                  height="100px"
                  alt="Add Favicon"
                  className="mt-1"
                />
              </div>
            </div>
            <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgb(209, 201, 201)" }} className="mb-3">
              <label htmlFor="Preview" className="modal_label_setting">
                Logo
              </label>
              <div>
                <img
                  src={`/assets/upload/setting/${userData.logo}`}
                  width="100px"
                  height="100px"
                  alt="Add Favicon"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="modal_label_setting">
                Password:-
              </label>
              <p className="mt-1">{userData && userData.password}</p>
            </div>
          </div>
          <div
            id="social-media"
            className={`tab-content add_data_form ${activeTab === "social-media" ? "active" : ""
              }`}
          >
            <div className="mb-3">
              <label htmlFor="whatsapp" className="modal_label_setting">
                Whatsapp:-
              </label>
              <p className="mt-1">{settingData && settingData.whatsapp_link}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="facebook" className="modal_label_setting">
                Facebook:-
              </label>
              <p className="mt-1">{settingData && settingData.facebook_link}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="twiter" className="modal_label_setting">
                Twiter:-
              </label>
              <p className="mt-1">{settingData && settingData.twiter_link}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="instagram" className="modal_label_setting">
                Instagram:-
              </label>
              <p className="mt-1">{settingData && settingData.instagram_link}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="linkdin" className="modal_label_setting">
                Linkedin:-
              </label>
              <p className="mt-1">{settingData && settingData.linkedin_link}</p>
            </div>
          </div>

        </div>
        <Toast />
      </section>
    </>
  );
};

export default AllSetting;