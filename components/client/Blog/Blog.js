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
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <section>
          <div className="containers">
            <div className="main_blogs">
              <div className="flex flex-wrap justify-center">
                {blogs.map((item, idx) => {
                  const slug = item?.blog_title.replace(/\s+/g, '-'); 
                  return (
                    <div className="sm:w-1/2 md:w-1/3 lg:w-3/12 blog_image_section" key={item?.blog_id}>
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
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Blog;
