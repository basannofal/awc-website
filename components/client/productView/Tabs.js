import React, { useState, useEffect } from 'react'

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('description');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const truncateString = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        } else {
            return str;
        }
    };
    return (
        <>
            <div className='main_tab_section'>
                <div>
                    <button
                        className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => handleTabClick('description')}
                    >
                        DESCRIPTION
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'docs' ? 'active' : ''}`}
                        onClick={() => handleTabClick('docs')}
                    >
                        DOCS
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
                        onClick={() => handleTabClick('photos')}
                    >
                        PHOTOS
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'testing-videos' ? 'active' : ''}`}
                        onClick={() => handleTabClick('testing-videos')}
                    >
                        TESTING VIDEOS
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
                        onClick={() => handleTabClick('certificate')}
                    >
                        CERTIFICATES
                    </button>
                </div>

                {activeTab === 'description' && (
                    <div>
                        <p className='product_view_desc_title'>Product Information</p>
                        <p className='product_view_desc_desc'>Product Composition: Roof-540 is the newest development in water based chemical waterproofing and waterproofing treatment for roof. It is created using the latest acrylic technology that helps it form a tough high solid elastomer coating. 100% acrylic resins of the best quality are added to reinforcing laminar pigments which make Roof-540 a very effective biocide and a non-migrating fire retardant. Also, these give Roof-540 its famous superior durability, making it an excellent roof waterproofing, and terrace waterproofing solution that has high resistance to UV radiation besides being resistant to algae, mildew and fires.</p>
                    </div>
                )}
                {activeTab === 'docs' && (
                    <div>
                        <p className='product_view_doc_title'>Technical Details and Brouchers</p>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                    </div>
                )}
                {activeTab === 'photos' && (
                    <div>
                        <p className='product_view_photo_title'>Photos</p>
                        <div className='grid'>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <img src='./assets/images/client/Group 591.png' alt='' />
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <img src='./assets/images/client/Group 591.png' alt='' />
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <img src='./assets/images/client/gallery-img-7.png' alt='' />
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <img src='./assets/images/client/gallery-img-7.png' alt='' />
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <img src='./assets/images/client/gallery-img-7.png' alt='' />
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <img src='./assets/images/client/gallery-img-7.png' alt='' />
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'testing-videos' && (
                    <div>
                        <p className='product_view_photo_title'>Photos</p>
                        <div className='grid'>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <div className='product_view_youtube_icon'>
                                    <img src='./assets/images/client/hqdefault 1.png' alt='' />
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                                <p className='product-view-title'>{truncateString("How we do Application For AWC Roof 540", 40)}</p>
                                <p>@Awc India</p>
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <div className='product_view_youtube_icon'>
                                    <img src='./assets/images/client/hqdefault 1.png' alt='' />
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                                <p className='product-view-title'>{truncateString("How we do Application For AWC Roof 540", 40)}</p>
                                <p>@Awc India</p>
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <div className='product_view_youtube_icon'>
                                    <img src='./assets/images/client/hqdefault 1.png' alt='' />
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                                <p className='product-view-title'>{truncateString("How we do Application For AWC Roof 540 How we do Application For AWC Roof 540 How we do Application For AWC Roof 540 How we do Application For AWC Roof 540", 80)}</p>
                                <p>@Awc India</p>
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <div className='product_view_youtube_icon'>
                                    <img src='./assets/images/client/hqdefault 1.png' alt='' />
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                                <p className='product-view-title'>{truncateString("How we do Application For AWC Roof 540", 40)}</p>
                                <p>@Awc India</p>
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <div className='product_view_youtube_icon'>
                                    <img src='./assets/images/client/hqdefault 1.png' alt='' />
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                                <p className='product-view-title'>{truncateString("How we do Application For AWC Roof 540", 40)}</p>
                                <p>@Awc India</p>
                            </div>
                            <div className='lg-4 md-6 sm-12 product_view_images_gallary'>
                                <div className='product_view_youtube_icon'>
                                    <img src='./assets/images/client/hqdefault 1.png' alt='' />
                                    <i class="fa-brands fa-youtube"></i>
                                </div>
                                <p className='product-view-title'>{truncateString("How we do Application For AWC Roof 540 How we do Application For AWC Roof 540 How we do Application For AWC Roof 540 How we do Application For AWC Roof 540", 80)}</p>
                                <p>@Awc India</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'certificate' && (
                    <div>
                        <p className='product_view_doc_title'>Technical Details and Brouchers</p>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                        <div className='product_view_docs_main'>
                            <div className='product_view_doc_thumbnail'><img src={'./assets/images/client/pdf 2.png'} alt="" /></div>
                            <div className='product_view_doc_thumbnail_title'>Why To Choose Roof 540? </div>
                            <div className='product_view_doc_dowonload'><i class="fa-solid fa-download"></i></div>
                        </div>
                    </div>
                )}
            </div >
        </>
    )
}

export default Tabs
