import React from 'react';
import Navbar from '@/layouts/Client/Navbar';
import HeroSection from './HeroSection';
import TestiContact from './TestiContact';
import Footer from '@/layouts/Client/Footer';

const index = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <TestiContact />
            <Footer />
        </>
    )
}

export default index
