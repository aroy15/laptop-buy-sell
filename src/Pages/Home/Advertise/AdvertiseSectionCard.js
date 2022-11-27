import React from 'react';
import { FaAd } from 'react-icons/fa';

const AdvertiseSectionCard = ({ advertisedItem }) => {
    const { name, image, category, resalePrice, condition, yearsOfUse } = advertisedItem;
    return (
        <div className='w-full lg:w-1/2 p-3 flex'>
            <div className="card sm:card-side bg-white shadow-xl rounded-md items-center relative w-full">
                <div className='absolute top-2 right-3 text-xl'><FaAd /></div>
                <figure className='p-4 card_img w-full'><img className='h-36 object-contain' src={image} alt={name} /></figure>
                <div className="card-body w-full items-center text-center sm:text-left  sm:items-start p-5 sm:pl-2">
                    <h2 className="card-title pt-1">{name}</h2>
                    <div>
                        <p className='italic'>Brand: {category}</p>
                        <p className='italic'>Years of Use: {yearsOfUse} {yearsOfUse > 1 ? 'years' : 'year'}</p>
                    </div>
                    <div className="card-actions justify-between border-t border-base-200 w-full pt-1">
                        <span className='text-secondary font-semibold'>Price: ${resalePrice}</span>
                        <span>Condition: {condition}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseSectionCard;