import React from 'react';
import './Advertise.css'

const Advertise = () => {
    return (
        <section className='py-16'>
            <div className="container">
                <h2 className="text-4xl text-primary font-bold text-center mb-8">Advertised Laptops</h2>
                <div className="flex flex-col lg:flex-row justify-center gap-6 max-w-5xl w-full mx-auto text-center sm:text-left">
                    <div className="card sm:card-side bg-white shadow-xl w-full lg:w-1/2 items-center">
                        <figure className='p-4 card_img w-full'><img src="https://raw.githubusercontent.com/aroy15/image-store/master/laptop/lenovo-e31-70-80kx-core-i3-7th-gen-laptop.webp" alt="Album" /></figure>
                        <div className="card-body items-center sm:items-start p-5 sm:pl-2">
                            <h2 className="card-title">Lenovo Laptop</h2>
                            <p>Best 8th Generation Laptop</p>
                            <div className="card-actions justify-between border-t border-base-200 w-full pt-1">
                                <span className='text-secondary font-semibold'>Price: $110</span>
                                <span>Condition: Good</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Advertise;