import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
    return (
        <section className='py-16 bg-light'>
            <div className="container">
                <h2 className="text-4xl text-primary font-bold text-center mb-8">Laptop's Brand Category </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="px-8 pt-8">
                            <img src="https://raw.githubusercontent.com/aroy15/image-store/master/laptop/lenovo-logo.webp" alt="Shoes" className="cate_logo" />
                        </figure>
                        <div className="card-body items-center text-center p-5">
                            <h3 className="text-3xl text-secondary font-bold">Lenovo</h3>
                            <div className="card-actions pt-3">
                                <Link className="btn bg-secondary text-light hover:bg-primary rounded-xl">Show All</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="px-8 pt-8">
                            <img src="https://raw.githubusercontent.com/aroy15/image-store/master/laptop/dell-logo.webp" alt="Shoes" className="cate_logo" />
                        </figure>
                        <div className="card-body items-center text-center p-5">
                            <h3 className="text-3xl text-secondary font-bold">DELL</h3>
                            <div className="card-actions pt-3">
                                <Link className="btn bg-secondary text-light hover:bg-primary rounded-xl">Show All</Link>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <figure className="px-8 pt-8">
                            <img src="https://raw.githubusercontent.com/aroy15/image-store/master/laptop/hp-logo.webp" alt="Shoes" className="cate_logo" />
                        </figure>
                        <div className="card-body items-center text-center p-5">
                            <h3 className="text-3xl text-secondary font-bold">HP</h3>
                            <div className="card-actions pt-3">
                                <Link className="btn bg-secondary text-light hover:bg-primary rounded-xl">Show All</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategorySection;