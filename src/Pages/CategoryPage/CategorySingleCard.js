import React from 'react';
import { FaCheckCircle, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CategorySingleCard = ({ laptopItem, setProductData }) => {
    const { name, category, categoryImage, image, location, yearsOfUse, resalePrice, originalPrice, postedTime, seller, verified, condition, mobile, description } = laptopItem;
    return (
        <div className="flex flex-col md:flex-row md:flex-nowrap gap-5 rounded-xl shadow-lg bg-white overflow-hidden">
            <figure className='p-4 flex items-center card_left md:mx-0 mx-auto'><img className='md:h-56 w-full object-contain object-center' src={image} alt={name} /></figure>
            <div className='space-y-4 p-5 w-full'>
                <h2 className="text-2xl text-primary">{name}</h2>
                <p>{description}</p>
                <div className='flex flex-col lg:flex-row lg:justify-between gap-8 text-primary w-full'>
                    <div className='flex flex-col gap-1 w-full lg:w-1/2'>
                        <p><strong>Re-sale Price:</strong> ${resalePrice}</p>
                        <p><strong>Original Price:</strong> ${originalPrice}</p>
                        <p><strong>Years of Use:</strong> {yearsOfUse} {yearsOfUse > 1 ? "years": "year"}</p>
                        <p className='capitalize'><strong>Condition Type:</strong> {condition}</p>
                    </div>
                    <div className='font-semibold flex flex-col gap-2 w-full lg:w-1/2 sm:text-left text-center items-center sm:items-start'>
                        <p className='flex gap-2 items-center'> Seller: {verified && <FaCheckCircle title='Verified' className='text-green-600' />} <span className='italic'>{seller}</span></p>
                        <a className='flex gap-2 items-center' href={`tel:${mobile}`}> <FaPhoneAlt className='text-secondary' /> {mobile}</a>
                        <p className='flex gap-2 items-center'> <FaMapMarkerAlt className='text-secondary' /> {location}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center border-t border-base-200 w-full pt-1 gap-3">
                    <span className='text-secondary font-semibold text-sm italic flex flex-wrap'><span className='pr-1'>Posted on:</span> {postedTime}</span>
                    <label onClick={()=>setProductData(laptopItem)} htmlFor="booking-modal" className="btn h-auto min-h-0 bg-secondary hover:bg-green-600 border-0 rounded capitalize py-3 text-white">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default CategorySingleCard;