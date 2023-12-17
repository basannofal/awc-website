import React from "react";

const Contact = () => {
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
                        <img src={"./assets/images/client/unit_image_1.webp"} alt="Unit Image" />
                      </div>
                    </div>
                  </div>
                  <div className="grid no-margin">
                    <div className="sm-12 md-6">
                      <div className="image-sec">
                        <img src={"./assets/images/client/unit_image_2.webp"} alt="Unit Image" />
                      </div>
                    </div>
                    <div className="sm-12 md-6">
                      <div className="image-sec">
                        <img src={"./assets/images/client/unit_image_3.webp"} alt="Unit Image" />
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
                  <form className="contact-form" method="post">
                    <div className="form-field">
                      <label for="name" className="form-label">
                        Your Name: <small>*</small>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
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
                        placeholder="Enter Your Email"
                        className="form-input"
                      />
                    </div>
                    <div className="form-field">
                      <label for="mobile" className="form-label">
                        Mobile No.:
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
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
                        placeholder="Type Your Message Here..."
                        className="form-input"
                      ></textarea>
                    </div>
                    <div className="form-actions">
                      <input
                        className="btn-primary"
                        type="submit"
                        value="Submit Information"
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
