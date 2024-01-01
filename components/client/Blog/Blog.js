import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Blog = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const getBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/blog/allblogs/router`
      );
      console.log(response.data);
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  function extractFirstParagraph(content) {
    const parser = new DOMParser();

    const doc = parser.parseFromString(content, "text/html");

    const firstParagraphTag = doc.querySelector("p");

    if (firstParagraphTag) {
      const words = firstParagraphTag.textContent.split(/\s+/);
      const limitedText = words.slice(0, 20).join(" ");
      return limitedText;
    }

    return "";
  }

  useEffect(() => {
    const fetchData = async () => {
      await getBlog();
    };
    fetchData();
  }, []);
  return (
    <>
      <section>
        <div className="containers">
          <div className="main_blogs">
            <div className="flex flex-wrap justify-center">
              {loading ? (
                <>
                  <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section">
                    <div
                      role="status"
                      class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    >
                      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96">
                        <svg
                          class="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="blog_desc_section mt-3">
                        <div className="w-full">
                          <div class="h-4 bg-gray-200 rounded-full w-52 mb-0"></div>
                        </div>
                      </p>
                      <p className="blog_sec_desc_section">
                        <div className="w-full">
                          <div class="h-28 bg-gray-200 rounded w-52 mb-0"></div>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section">
                    <div
                      role="status"
                      class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    >
                      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96">
                        <svg
                          class="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="blog_desc_section mt-3">
                        <div className="w-full">
                          <div class="h-4 bg-gray-200 rounded-full w-52 mb-0"></div>
                        </div>
                      </p>
                      <p className="blog_sec_desc_section">
                        <div className="w-full">
                          <div class="h-28 bg-gray-200 rounded w-52 mb-0"></div>
                        </div>
                      </p>
                    </div>
                  </div>
                  <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section">
                    <div
                      role="status"
                      class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                    >
                      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96">
                        <svg
                          class="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="blog_desc_section mt-3">
                        <div className="w-full">
                          <div class="h-4 bg-gray-200 rounded-full w-52 mb-0"></div>
                        </div>
                      </p>
                      <p className="blog_sec_desc_section">
                        <div className="w-full">
                          <div class="h-28 bg-gray-200 rounded w-52 mb-0"></div>
                        </div>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                blogs.map((item, idx) => {
                  const slug = item?.blog_title.replace(/\s+/g, "-");
                  return (
                    <div
                      className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section"
                      key={item?.blog_id}
                    >
                      <img
                        src={`./assets/upload/blogs/${item?.blog_thumbnail}`}
                        alt="blog_image"
                      />
                      <div className="blog_name_main_section">
                        <div className="blog_name_section">AWC India</div>
                        <div className="blog_rectangle"></div>
                        <div className="blog_name_section">
                          {item?.published_date.substring(0, 10)}
                        </div>
                      </div>
                      <Link href={`/blogs/${slug}/${item?.blog_id}`}>

                      <p className="blog_desc_section">
                        {item?.blog_title}
                      </p>
                      </Link>
                      <p className="blog_sec_desc_section">
                        {extractFirstParagraph(item?.blog_description)}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="main_blogs relative">
            <ol
              className="flex justify-center gap-1 text-xs font-medium absolute"
              style={{ right: "10%" }}
            >
              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  1
                </a>
              </li>

              <li className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
