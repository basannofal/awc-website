import axios from "axios";
import React, { useState } from "react";

const Contact = () => {
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
      <section className="contact-us-sec">
        <div className="container">
          <div className="contact-us-inner">
            <div className="grid">
              <div className="lg-7 sm-12">
                <div className="contact-image-sec">
                  <h2>
                    Our State of Art <span>Lean Manufacturing Unit</span>
                  </h2>
                  <div className="grid no-margin">
                    <div className="sm-12">
                      <div className="image-sec">
                        <img
                          src={"./assets/images/client/unit_image_1.webp"}
                          alt="Unit Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid no-margin">
                    <div className="sm-12 md-6">
                      <div className="image-sec">
                        <img
                          src={"./assets/images/client/unit_image_2.webp"}
                          alt="Unit Image"
                        />
                      </div>
                    </div>
                    <div className="sm-12 md-6">
                      <div className="image-sec">
                        <img
                          src={"./assets/images/client/unit_image_3.webp"}
                          alt="Unit Image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg-5 sm-12">
                <div className="form-sec">
                  <h4>Contact Us</h4>
                  <p>
                    If you require additional information, please complete the
                    form below and submit it. Our team will be in touch with you
                    promptly.
                  </p>
                  <form
                    className="contact-form"
                    method="post"
                    onSubmit={saveData}
                  >
                    <div className="form-field">
                      <label for="name" className="form-label">
                        Your Name: <small>*</small>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChangeData}
                        value={addFormData.name}
                        placeholder="Enter Your Name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label for="email" className="form-label">
                        Your Email: <small>*</small>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChangeData}
                        value={addFormData.email}
                        placeholder="Enter Your Email"
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label for="number" className="form-label">
                        Mobile No.:
                      </label>
                      <input
                        type="text"
                        name="number"
                        id="number"
                        onChange={handleChangeData}
                        value={addFormData.number}
                        placeholder="Enter Your Mobile"
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label for="message" className="form-label">
                        Message <small>*</small>
                      </label>
                      <textarea
                        rows="3"
                        name="message"
                        id="message"
                        onChange={handleChangeData}
                        value={addFormData.message}
                        placeholder="Type Your Message Here..."
                        className="form-input"
                      ></textarea>
                    </div>
                    {validationError && validationError != "" ? (
                      <span style={{ color: "red" }}>* {validationError}</span>
                    ) : (
                      ""
                    )}
                    <div className="form-actions">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
