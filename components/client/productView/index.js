import React from 'react';
import Navbar from '@/layouts/Client/Navbar';
import HeroSection from './HeroSection';
import Footer from '@/layouts/Client/Footer';
import Tabs from './Tabs';

const index = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Tabs />
            <Footer />
        </>
    )
}

export default index
