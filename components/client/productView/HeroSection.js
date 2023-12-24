import React from 'react'

const HeroSection = () => {
    return (
        <>
            <div className='product_view_main'>
                <p className="view_product_back_arrow">
                    Products <i className="fa-solid fa-angles-right"></i>
                    Roof Water Proofing{" "}
                    <i className="fa-solid fa-angles-right"></i> Roof 540
                </p>

                <div className='product_view_hero_section'>
                    <div className='product_view_image'><img src={'./assets/images/client/Group 593.png'} alt='product-view-image' />
                    </div>
                    <div className='product_view_hero_section_right_conent'>
                        <p className='product_view_hero_section_title'>AWC - ROOF 540</p>
                        <p className='product_view_hero_section_second_title'>Premium Quality Water Proofing Systems For Virtually Any Kind Of Roof</p>
                        <p className='product_view_hero_section_desc'>Roof-540 is the newest development in water based chemical waterproofing and waterproofing treatment for roof.</p>
                        <button className='product_view_hero_section_btn'>INQUIRY NOW</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection
