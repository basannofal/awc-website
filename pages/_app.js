import "@/styles/globals.css";
import "@/styles/Dashboard.css";
import "@/styles/User.css";
import "@/styles/client/Home.css";
import "@/styles/client/About.css";
import "@/styles/client/Blog.css";
import "@/styles/client/Testimonial.css";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App({ Component, pageProps }) {

  const [GlobalSeo, setGlobalSeo] = useState({})

  const getGlobalData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/global-seo/router`
      );
      setGlobalSeo(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      await getGlobalData();
    }
    fetchData()
  }, []);
  
  return (
    <>
      <Head>
        <title>AWC Web</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
          integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
