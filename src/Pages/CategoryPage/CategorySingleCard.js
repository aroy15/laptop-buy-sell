import React from 'react';

const CategorySingleCard = ({laptopItem}) => {
    const { name, category, categoryImage, image, location, yearsOfUse, resalePrice, originalPrice, postedTime, seller, verified } = laptopItem;
    return (
        <div className="card sm:card-side bg-white shadow-xl w-full items-center">
            <figure className='p-4 max-w-xs w-full'><img src={image} alt={name} /></figure>
            <div className="card-body items-center sm:items-start p-5 sm:pl-2">
                <h2 className="card-title">{name}</h2>
                <p>Best 8th Generation Laptop</p>
                <div className="card-actions justify-between border-t border-base-200 w-full pt-1">
                    <span className='text-secondary font-semibold'>Price: $110</span>
                    <span>Condition: Good</span>
                </div>
            </div>
        </div>
    );
};

export default CategorySingleCard;