import React, { useEffect, useState } from "react";
import $ from "jquery";

const Question = () => {
  const [plus, setPlus] = useState(false);
  useEffect(() => {
    const accordion_head = $(".accordion_head").length;
    if (accordion_head > 0) {
      $(".accordion_head").click(function () {
        if ($(".accordion_body").is(":visible")) {
          $(".accordion_body").slideUp(300);
          // $(".plusminus").attr("src", "images/plus-arrow.png");
          $(".plusminus").attr("src", "/assets/images/client/plus-arrow.png");
        }
        if ($(this).next(".accordion_body").is(":visible")) {
          $(this).next(".accordion_body").slideUp(300);
          $(this)
            .children(".plusminus")
            .attr("src", "/assets/images/client/plus-arrow.png");
        } else {
          $(this).next(".accordion_body").slideDown(300);
          $(this)
            .children(".plusminus")
            .attr("src", "/assets/images/client/minus-arrow.png");
        }
      });
    }
  }, [plus]);
  const handleQuestionClick = (event) => {
    // Stop event propagation to prevent undesired behavior
    event.stopPropagation();
    setPlus(!plus);
  };
  return (
    <>
      <section className="faqs-sec">
        <div className="container">
          <div className="faqs-inner">
            <h2>Commonly Asked Questions</h2>
            <div className="accordion_content">
              <h3
                className="accordion_head"
                onClick={(e) => handleQuestionClick(e)}
              >
                What types of surfaces can AWC waterproofing solutions be
                applied to?
                <img
                  className="plusminus"
                  src={"/assets/images/client/minus-arrow.png"}
                  alt="Minus Icon"
                />
              </h3>
              <div className="accordion_body">
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
            <div className="accordion_content">
              <h3 className="accordion_head">
                How long does the waterproofing solution last?
                <img
                  className="plusminus"
                  src={"/assets/images/client/plus-arrow.png"}
                  alt="Plus Icon"
                />
              </h3>
              <div className="accordion_body" style={{ display: "none" }}>
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
            <div className="accordion_content">
              <h3 className="accordion_head">
                Do you offer customized solutions for unique projects?
                <img
                  className="plusminus"
                  src={"/assets/images/client/plus-arrow.png"}
                  alt="Plus Icon"
                />
              </h3>
              <div className="accordion_body" style={{ display: "none" }}>
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
            <div className="accordion_content">
              <h3 className="accordion_head">
                Are your products environmentally friendly?
                <img
                  className="plusminus"
                  src={"/assets/images/client/plus-arrow.png"}
                  alt="Plus Icon"
                />
              </h3>
              <div className="accordion_body" style={{ display: "none" }}>
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
            <div className="accordion_content">
              <h3 className="accordion_head">
                Can your waterproofing solutions be applied in extreme weather
                conditions?
                <img
                  className="plusminus"
                  src={"/assets/images/client/plus-arrow.png"}
                  alt="Plus Icon"
                />
              </h3>
              <div className="accordion_body" style={{ display: "none" }}>
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
            <div className="accordion_content">
              <h3 className="accordion_head">
                What distinguishes AWC from other waterproofing companies?
                <img
                  className="plusminus"
                  src={"/assets/images/client/plus-arrow.png"}
                  alt="Plus Icon"
                />
              </h3>
              <div className="accordion_body" style={{ display: "none" }}>
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
            <div className="accordion_content">
              <h3 className="accordion_head">
                How do I get a quote or estimate for a specific project?
                <img
                  className="plusminus"
                  src={"/assets/images/client/plus-arrow.png"}
                  alt="Plus Icon"
                />
              </h3>
              <div className="accordion_body" style={{ display: "none" }}>
                <p>
                  AWC waterproofing solutions are versatile and can be applied
                  to a wide range of surfaces, including concrete, roofs,
                  terraces, walls, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Question;
