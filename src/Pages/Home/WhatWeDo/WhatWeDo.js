import React from 'react';
import { FaCheckSquare } from 'react-icons/fa';


const WhatWeDo = () => {
    return (
        <section className='py-16 bg-white text-primary'>
            <div className="container">
                <div className="max-w-5xl w-full mx-auto">
                    <h2 className="text-3xl font-bold pb-5 text-center">What We Do?</h2>
                    <div className="grid grid cols-1 grid lg:grid-cols-2 gap-8 text-xl">
                        <div className='flex justify-center flex-col gap-3'>
                            <div className="flex gap-2 items-start">
                                <span><FaCheckSquare className='relative top-1' /></span>
                                <span>We are providing 24 hour service.</span>
                            </div>
                            <div className="flex gap-2 items-start">
                                <span><FaCheckSquare className='relative top-1' /></span>
                                <span>Always we are trying to solve our buyer's different type question about product.</span>
                            </div>
                            <div className="flex gap-2 items-start">
                                <span><FaCheckSquare className='relative top-1' /></span>
                                <span>This Site is also seller friendly. we are always help to our seller to make product details </span>
                            </div>
                        </div>
                        <div className='flex justify-center lg:justify-end'>
                            <div>
                                <img src="https://raw.githubusercontent.com/aroy15/image-store/master/laptop/dell-group-laptop.webp" alt="laptops image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;