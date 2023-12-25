import Link from 'next/link'
import React from 'react'

const HeroSection = ({product}) => {
    return (
        <>
            <div className='product_view_main'>
                <p className="view_product_back_arrow">
                    <Link href={"/product"}>
                     Products 
                    </Link>
                     <i className="fa-solid fa-angles-right"></i>
                     <Link href={`/product-category/${product?.category_name}/${product?.cate_id}`}>
                    {product?.category_name}{" "}
                     </Link>
                    <i className="fa-solid fa-angles-right"></i> {product?.product_title}
                </p>

                <div className='product_view_hero_section'>
                    <div className='product_view_image'><img src={`/assets/upload/products/${product?.product_image}`} alt='product-view-image' />
                    </div>
                    <div className='product_view_hero_section_right_conent'>
                        <p className='product_view_hero_section_title'>{product?.product_title}</p>
                        <p className='product_view_hero_section_second_title' dangerouslySetInnerHTML={{__html:product?.product_short_desc}}></p>
                        {/* <p className='product_view_hero_section_desc'>Roof-540 is the newest development in water based chemical waterproofing and waterproofing treatment for roof.</p> */}
                        <button className='product_view_hero_section_btn'>INQUIRY NOW</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection
