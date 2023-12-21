import React from 'react';
import Navbar from '@/layouts/Client/Navbar';
import HeroSection from './HeroSection';
import Blog from './Blog';
import Footer from '@/layouts/Client/Footer';

const index = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Blog />
            <Footer />
        </>
    )
}

export default index
