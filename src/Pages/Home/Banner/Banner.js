import React from 'react';
import bannerImg from '../../../assets/images/dell-laptops.webp'

const Banner = () => {
    return (
        <section className='py-10 bg-base-200'>
            <div className="container">
                <div className="hero">
                    <div className="hero-content flex-col lg:flex-row">
                        <img src={bannerImg} className="max-w-xl w-full" />
                        <div>
                            <h1 className="text-5xl font-bold">Best Brand's Second Hand Laptops</h1>
                            <p className="py-6 text-lg">Do you find your dream laptop in cheap price? You are on the right place, there are best second hand laptop available. You can also sell your old laptop here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;