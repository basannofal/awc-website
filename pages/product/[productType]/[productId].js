// pages/product/[productType]/[productId].js

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const ProductDetailPage = () => {
  const router = useRouter();
  const { productType, productId } = router.query;

  useEffect(() => {
    // Fetch data based on productType and productId
    // Example: fetch(`/api/products/${productType}/${productId}`)
    //   .then(response => response.json())
    //   .then(data => console.log(data));
  }, [productType, productId]);

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product Type: {productType}</p>
      <p>Product ID: {productId}</p>
      {/* Render product details here */}
    </div>
  );
};

export default ProductDetailPage;
