import React, { useEffect, useState } from 'react';

const HeroSection = () => {
    const [activeTab, setActiveTab] = useState('office');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <section className='container flex flex-wrap mb-5' id="main_contact" >
                <div className='lg-5 sm-12'>
                    <div>
                        <button
                            className={`contact_btn ${activeTab === 'office' ? 'active' : ''}`}
                            onClick={() => handleTabClick('office')}
                        >
                            OFFICE
                        </button>
                        <button
                            className={`contact_btn ${activeTab === 'factory' ? 'active' : ''}`}
                            onClick={() => handleTabClick('factory')}
                        >
                            FACTORY
                        </button>
                    </div>

                    {/* Content based on the active tab */}
                    {activeTab === 'office' && (
                        <div>
                            <p className='contact_title'>AWC INDIA</p>
                            <p className='contact_second_title'>Connecting Excellence, Exceeding Expectations</p>
                            <p className='contact_desc'>Feel free to get in touch with us at aWC india. We're here to answer your questions and provide exceptional solutions. Your inquiries are important to us, and we're committed to delivering quality service that goes above and beyond your expectations.</p>
                            <p className='contact_address'><span className='contact_address_title'>Address:</span>A-11, 4th Floor, Malad Yojana CHSL, S.V.Road, Malad (W),
                                Mumbai - 400 064</p>
                            <p className='contact_phone'><span className='contact_address_title'>Phone:</span>+91 86 86 86 2475</p>
                            <p className='contact_email'><span className='contact_address_title'>Email Address:</span>info@awcindia.in</p>
                            <div className='flex'>
                                <div className='social_icons' id='first_social_icon'><i class="fa-brands fa-facebook-f"></i></div>
                                <div className='social_icons'><i class="fa-brands fa-instagram"></i></div>
                                <div className='social_icons'><i class="fa-brands fa-linkedin-in"></i></div>
                                <div className='social_icons'><i class="fa-brands fa-pinterest-p"></i></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'factory' && (
                        <div>
                            <p>Factory Content Goes Here</p>
                        </div>
                    )}
                </div>
                <div className="lg-5 sm-12" id='right_section'>
                    <div className="form-sec" id='contact_form'>
                        <h4>Contact Us</h4>
                        <p className='text-xs'>
                            If you require additional information, please complete the
                            form below and submit it. Our team will be in touch with you
                            promptly.
                        </p>
                        <form className="contact-form" method="post">
                            <div className="form-field">
                                <label for="name" className="form-label" id='form-lable-contact'>
                                    Your Name: <small>*</small>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    className="form-input-contact"
                                />
                            </div>
                            <div className="form-field">
                                <label for="email" className="form-label" id='form-lable-contact'>
                                    Your Email: <small>*</small>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email"
                                    className="form-input-contact"
                                />
                            </div>
                            <div className="form-field">
                                <label for="mobile" className="form-label" id='form-lable-contact'>
                                    Mobile No.:
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    id="mobile"
                                    placeholder="Enter Your Mobile"
                                    className="form-input-contact"
                                />
                            </div>
                            <div className="form-field">
                                <label for="message" className="form-label" id='form-lable-contact'>
                                    Message <small>*</small>
                                </label>
                                <textarea
                                    rows="3"
                                    name="message"
                                    id="message"
                                    placeholder="Type Your Message Here..."
                                    className="form-input-contact"
                                ></textarea>
                            </div>
                            <div className="form-action">
                                <input
                                    className="btn-primary"
                                    id='contact_btn'
                                    type="submit"
                                    value="Submit Information"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <div className='contact_map'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2544093537063!2d72.84442907498021!3d19.18408738204289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6fcc002f427%3A0x75bcc8c871340dd5!2sAWC%20India%20-%20Roof%20Waterproofing%20Company!5e0!3m2!1sen!2sin!4v1703251762987!5m2!1sen!2sin" width="600" height="600" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    );
};

export default HeroSection;
