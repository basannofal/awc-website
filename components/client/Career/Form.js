import React from "react";

const Form = () => {
  return (
    <div className="blog-view-sec">
      <div className="container mb-6">
        <div className="form_main lg:py-7 py-6">
          <p className="form_title text-center">Apply Now</p>
          <p className="text-center mb-6">Submit The Form Below To Apply</p>
          <form action="">
            <div className="grid gap-6 mb-6 md:grid-cols-2 justify-center">
              <div className="lg:w-1/3 md:w-2/5 w-5/6">
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-semibold text-gray-900"
                >
                  Your Name:
                  <span className="text-red-600 font-black fs-2">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-white border border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="lg:w-1/3 md:w-2/5 w-5/6">
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-semibold text-gray-900"
                >
                  Your Email:
                  <span className="text-red-600 font-black fs-2">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="bg-white border border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  placeholder="Enter Your Email"
                />
              </div>
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2 justify-center">
              <div className="lg:w-1/3 md:w-2/5 w-5/6">
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-semibold text-gray-900"
                >
                  Mobile No:
                </label>
                <input
                  type="text"
                  id="mobile_no"
                  className="bg-white border border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  placeholder="Enter Your Mobile"
                />
              </div>
              <div className="lg:w-1/3 md:w-2/5 w-5/6">
                <label
                  htmlFor="first_name"
                  className="block mb-1 text-sm font-semibold text-gray-900"
                >
                  Expected Salary:
                </label>
                <input
                  type="text"
                  id="expected_salary"
                  className="bg-white border border-gray-300 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                  placeholder="Expected Salary"
                />
              </div>
            </div>
            <div className="career_form_file_input">
              <label
                htmlFor="resume"
                className="block mb-1 text-sm font-semibold text-gray-900"
              >
                Upload CV / Resume
              </label>
            </div>
            <div className="flex items-center justify-center career_form_file_input">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full border border-gray-300 rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 lg:text-sm md:text-sm text-xs text-gray-500">
                    Click Or Drag This Area To Upload
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <div className="career_form_file_input">
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-semibold"
              >
                Message:
                <span className="text-red-600 font-black fs-2">*</span>
              </label>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:outline-none"
                placeholder="Type Your Message Here..."
              ></textarea>
            </div>
            <div className="carrer_submit_btn">
              <button
                className="btn-primary learn-btn"
                style={{ padding: "0px 30px" }}
              >
                submit information
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Form;
