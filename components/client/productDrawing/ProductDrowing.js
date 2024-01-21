import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductDrowing = () => {
  const router = useRouter();
  console.log(router.query);
  const { productType, productId } = router.query;
  const [loading, setLoading] = useState(true);
  const [allDrawings, setAllDrawings] = useState([]);

  const getProductDrawing = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/product-view/getproductdrawing/${productId}`
      );
      console.log(response.data);
      setAllDrawings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await getProductDrawing();
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mr-0 p-0 justify-evenly mb-5">
        {allDrawings.map((item, idx) => (
          <div key={idx} >
            <div className="card-container one-ifrme">
              <iframe
                title="pdf"
                src={`/assets/upload/products/productDrawing/${item.pdf_link}`}
                width="100%"
                height="300px"
              />
              <p>{item.pdf_title}</p>
              <Link href={`/assets/upload/products/productDrawing/${item.pdf_link}`} target="_blank" >

              <button>Download</button>
              </Link>
            </div>
          </div>
        ))}

      </div>


      {/* <div className="three-first-pdf">
        <div className="one-ifrme">
          <iframe
            title="pdf"
            src={`/assets/upload/products/productDrawing/${item.pdf_link}`}
            width="100%"
            height="300px"
          />
          <p>This is Our First pdf</p>
          <button>Download</button>
        </div>
        <div className="one-ifrme">
          <iframe
            title="pdf"
            src="/assets/images/pdf/1705738215131_Technical-Data-for-Roof-540.pdf"
            width="100%"
            height="300px"
          />
          <p>
            This is Our First pdf This is Our First pdf This is Our First pdf
            This is Our First pdf
          </p>
          <button>Download</button>
        </div>
        <div className="one-ifrme">
          <iframe
            title="pdf"
            src="/assets/images/pdf/1705738215131_Technical-Data-for-Roof-540.pdf"
            width="100%"
            height="300px"
          />
          <p>This is Our First pdf</p>
          <button>Download</button>
        </div>
      </div> */}
    </>
  );
};

export default ProductDrowing;
