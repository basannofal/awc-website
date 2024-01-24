import React, { useEffect, useState } from "react";
import Navbar from "@/layouts/Client/Navbar";
import Footer from "@/layouts/Client/Footer";
import Head from "next/head";
import { useRouter } from "next/router";
import Watshapp from "@/layouts/Client/Watshapp";

const index = ({ pid }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  console.log(pid);
  return (
    <>
      {loading ? (
        <div className="fixed top-12 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <>
       
          <Navbar />
          <Watshapp />
          <Footer />
        </>
      )}
    </>
  );
};

export default index;
