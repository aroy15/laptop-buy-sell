import React from 'react';

const CategoryBanner = ({laptopItems}) => {
    const {category, categoryImage} = laptopItems
    return (
        <section className='py-10 bg-primary text-light'>
            <div className="container">
                <div className="hero">
                    <div className="hero-content flex-col ">
                        <img src={categoryImage} className="max-w-xs w-full card_img" alt={category}/>
                        <div>
                            <h2 className="text-4xl font-bold">Second hand <span className='uppercase'>{category}</span> laptops</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoryBanner;