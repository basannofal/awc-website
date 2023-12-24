import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Index from "@/components/client/productCategory";

const ProductDetailPage = () => {
  const router = useRouter();
  const { productType, productId } = router.query;

  return (
    <>
    <h1>{productType}</h1>
    <h1>{productId}</h1>
    {/* // <Index pid={productId} /> */}
    </>
  );
};

export default ProductDetailPage;
