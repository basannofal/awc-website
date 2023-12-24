import React, { useEffect, useState, useRef } from "react";
import $ from "jquery";

const Question = () => {
  const faqData = [
    {
      question:
        "What types of surfaces can AWC waterproofing solutions be applied to?",
      answer:
        "AWC waterproofing solutions are versatile and can be applied to a wide range of surfaces, including concrete, roofs, terraces, walls, and more.",
    },
    {
      question: "How long does the waterproofing solution last?",
      answer:
        "AWC waterproofing solutions are versatile and can be applied to a wide range of surfaces, including concrete, roofs, terraces, walls, and more.",
    },
    {
      question: "Are Your Products Environmentally Friendly?",
      answer:
        "AWC waterproofing solutions are versatile and can be applied to a wide range of surfaces, including concrete, roofs, terraces, walls, and more.",
    },
    {
      question:
        "Can Your Waterproofing Solutions Be Applied In Extreme Weather Conditions?",
      answer:
        "AWC waterproofing solutions are versatile and can be applied to a wide range of surfaces, including concrete, roofs, terraces, walls, and more.",
    },
    {
      question: "What Distinguishes AWC From Other Waterproofing Companies?",
      answer:
        "AWC waterproofing solutions are versatile and can be applied to a wide range of surfaces, including concrete, roofs, terraces, walls, and more.",
    },
    {
      question: "How Do I Get A Quote Or Estimate For A Specific Project?",
      answer:
        "AWC waterproofing solutions are versatile and can be applied to a wide range of surfaces, including concrete, roofs, terraces, walls, and more.",
    },
  ];

  const accordionRef = useRef(null);

  useEffect(() => {
    const accordionHead = $(".accordion_head", accordionRef.current);
    const accordionBody = $(".accordion_body", accordionRef.current);

    accordionHead.click(function () {
      if (accordionBody.is(":visible")) {
        accordionBody.slideUp(300);
        $(".plusminus", this).attr(
          "src",
          "/assets/images/client/plus-arrow.png"
        );
      }
      if ($(this).next(accordionBody).is(":visible")) {
        $(this).next(accordionBody).slideUp(300);
        $(".plusminus", this).attr(
          "src",
          "/assets/images/client/plus-arrow.png"
        );
      } else {
        $(this).next(accordionBody).slideDown(300);
        $(".plusminus", this).attr(
          "src",
          "/assets/images/client/minus-arrow.png"
        );
      }
    });
  }, []);

  const [activeIndex, setActiveIndex] = useState(null);
  const handleQuestionClick = (event) => {
    // Stop event propagation to prevent undesired behavior
    // event.stopPropagation();
  };

  return (
    <>
      <section className="faqs-sec">
        <div className="container">
          <div className="faqs-inner">
            <h2>Commonly Asked Questions</h2>
            {faqData.map((faq, index) => (
              <div key={index} className="accordion_content">
                <h3
                  className={`accordion_head ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleQuestionClick(index)}
                >
                  {faq.question}
                  <img
                    className="plusminus"
                    src={
                      activeIndex === index
                        ? "/assets/images/client/minus-arrow.png"
                        : "/assets/images/client/plus-arrow.png"
                    }
                    alt={activeIndex === index ? "Minus Icon" : "Plus Icon"}
                  />
                </h3>
                <div
                  className={`accordion_body ${
                    activeIndex === index ? "show" : ""
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Question;
