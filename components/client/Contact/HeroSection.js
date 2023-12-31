
import axios from "axios";
import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("office");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const [addFormData, setAddFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  // add blog data section start
  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setAddFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveData = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (addFormData.name.trim() == "") {
      setValidationError("Invalid Name");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addFormData.email)) {
      setValidationError("Invalid Email");
      return;
    }

    const mobileRegex = /^\d{10}$/;
    if (addFormData.number && !mobileRegex.test(addFormData.number)) {
      setValidationError("Invalid Mobile Number");
      return;
    }

    if (addFormData.message.trim() == "") {
      setValidationError("Please Write Message");
      return;
    }

    setValidationError("");
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("name", addFormData.name);
      formdata.append("email", addFormData.email);
      formdata.append("number", addFormData.number);
      formdata.append("message", addFormData.message);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/client/contact/contactform/router`,
        formdata
      );
      setAddFormData({
        name: "",
        email: "",
        number: "",
        message: "",
      });
      setLoading(false);
    } catch (error) {
      setValidationError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="container flex flex-wrap mb-5" id="main_contact">
        <div className="lg-5 sm-12">
          <div>
            <button
              className={`tab-btn  ${
                activeTab === "office" ? "active" : ""
              }`}
              onClick={() => handleTabClick("office")}
            >
              OFFICE
            </button>
            <button
              className={`tab-btn  ${
                activeTab === "factory" ? "active" : ""
              }`}
              onClick={() => handleTabClick("factory")}
            >
              AWC Manufacturing Unit
            </button>
          </div>

          {/* Content based on the active tab */}
          {activeTab === "office" && (
            <div>
              <p className="contact_title">AWC INDIA</p>
              <p className="contact_second_title">
                Connecting Excellence, Exceeding Expectations
              </p>
              <p className="contact_desc">
                Feel free to get in touch with us at aWC india. We're here to
                answer your questions and provide exceptional solutions. Your
                inquiries are important to us, and we're committed to delivering
                quality service that goes above and beyond your expectations.
              </p>
              <p className="contact_address">
                <span className="contact_address_title">Address:</span>A-11, 4th
                Floor, Malad Yojana CHSL, S.V.Road, Malad (W), Mumbai - 400 064
              </p>
              <p className="contact_phone">
                <span className="contact_address_title">Phone:</span>+91 86 86
                86 2475
              </p>
              <p className="contact_email">
                <span className="contact_address_title">Email Address:</span>
                info@awcindia.in
              </p>
              <div className="flex">
                <div className="social_icons" id="first_social_icon">
                  <i class="fa-brands fa-facebook-f"></i>
                </div>
                <div className="social_icons">
                  <i class="fa-brands fa-instagram"></i>
                </div>
                <div className="social_icons">
                  <i class="fa-brands fa-linkedin-in"></i>
                </div>
                <div className="social_icons">
                  <i class="fa-brands fa-pinterest-p"></i>
                </div>
              </div>
            </div>
          )}

          {activeTab === "factory" && (
            <div>

              <p className="contact_title">AWC INDIA</p>
              <p className="contact_second_title">
                Connecting Excellence, Exceeding Expectations
              </p>
              <p className="contact_desc">
                Feel free to get in touch with us at aWC india. We're here to
                answer your questions and provide exceptional solutions. Your
                inquiries are important to us, and we're committed to delivering
                quality service that goes above and beyond your expectations.
              </p>
              <p className="contact_address">
                <span className="contact_address_title">Address:</span>
                Survey/Plot No:-662 Village:- Tembhi Taluka:- Umbergaon,Dist
                -Valsad, Umargam, Gujarat 396150
              </p>
              <p className="contact_phone">
                <span className="contact_address_title">Phone:</span>+91 86 86
                86 2475
              </p>
              <p className="contact_email">
                <span className="contact_address_title">Email Address:</span>
                info@awcindia.in
              </p>
              <div className="flex">
                <div className="social_icons" id="first_social_icon">
                  <i class="fa-brands fa-facebook-f"></i>
                </div>
                <div className="social_icons">
                  <i class="fa-brands fa-instagram"></i>
                </div>
                <div className="social_icons">
                  <i class="fa-brands fa-linkedin-in"></i>
                </div>
                <div className="social_icons">
                  <i class="fa-brands fa-pinterest-p"></i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg-5 sm-12" id="right_section">
          <div className="form-sec" id="contact_form">
            <h4>Contact Us</h4>
            <p className="text-xs">
              If you require additional information, please complete the form
              below and submit it. Our team will be in touch with you promptly.
            </p>

            <form className="contact-form" method="post" onSubmit={saveData}>
              <div className="form-field">
                <label
                  for="name"
                  className="form-label"
                  id="form-lable-contact"
                >
                  Your Name: <small>*</small>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"

                  onChange={handleChangeData}
                  value={addFormData.name}
                  placeholder="Enter Your Name"
                  className="form-input-contact"
                />
              </div>
              <div className="form-field">
                <label
                  for="email"
                  className="form-label"
                  id="form-lable-contact"
                >
                  Your Email: <small>*</small>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChangeData}
                  value={addFormData.email}
                  placeholder="Enter Your Email"
                  className="form-input-contact"
                />
              </div>
              <div className="form-field">
                <label
                  for="number"
                  className="form-label"
                  id="form-lable-contact"
                >
                  Mobile No.:
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  onChange={handleChangeData}
                  value={addFormData.number}
                  placeholder="Enter Your Mobile"
                  className="form-input-contact"
                />
              </div>
              <div className="form-field">
                <label
                  for="message"
                  className="form-label"
                  id="form-lable-contact"
                >
                  Message <small>*</small>
                </label>
                <textarea
                  rows="3"
                  name="message"
                  id="message"
                  onChange={handleChangeData}
                  value={addFormData.message}
                  placeholder="Type Your Message Here..."
                  className="form-input-contact"
                ></textarea>
              </div>

              {validationError && validationError != "" ? (
                <small style={{ color: "red" }}>* {validationError}</small>
              ) : (
                ""
              )}
              <div className="form-action mt-4">
                <input
                  style={loading ? { cursor: "not-allowed" } : {}}
                  className="btn-primary"
                  type="submit"
                  value={loading ? "Sending..." : "Submit Information"}
                  disabled={loading}
                />
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="contact_map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2544093537063!2d72.84442907498021!3d19.18408738204289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6fcc002f427%3A0x75bcc8c871340dd5!2sAWC%20India%20-%20Roof%20Waterproofing%20Company!5e0!3m2!1sen!2sin!4v1703251762987!5m2!1sen!2sin"
          width="600"
          height="600"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default HeroSection;
