import React from "react";

const Images = () => {
  return (
    <>
      <section className="gallery-image-sec">
        <div className="gallery-image-container">
          <div className="gallery-image-main-inner">
            <div className="grid">
              <div className="xl-4 lg-4 md-4 sm-6" id="gallery-main-images">
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-1.png"}
                    // width={"475px"}
                    // height={"370px"}
                  />
                </div>
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-4.png"}
                    // width={"475px"}
                    // height={"370px"}
                  />
                </div>
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-7.png"}
                    // width={"475px"}
                    // height={"370px"}
                  />
                </div>
              </div>
              <div className="xl-4 lg-4 md-4 sm-6" id="gallery-main-images">
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-2.png"}
                    // width={"402px"}
                    // height={"590px"}
                  />
                </div>
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-5.png"}
                    // width={"402px"}
                    // height={"590px"}
                  />
                </div>
              </div>
              <div className="xl-4 lg-4 md-4 sm-6" id="gallery-main-images">
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-3.png"}
                    // width={"499px"}
                    // height={"216px"}
                  />
                </div>
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-6.png"}
                    // width={"499px"}
                    // height={"216px"}
                  />
                </div>
                <div className="gallery-inner-images">
                  <img
                    src={"./assets/images/client/gallery-img-9.png"}
                    // width={"499px"}
                    // height={"216px"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Images;
