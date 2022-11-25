import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import CategoryBanner from './CategoryBanner';
import CategorySingleCard from './CategorySingleCard';

const CategoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState(null);
    const { user } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors } } = useForm();


    const laptopItems = useLoaderData();

    const handleBooking = data => {

    }

    return (
        <>
            <CategoryBanner laptopItems={laptopItems[0]}></CategoryBanner>
            <section className='py-16 bg-light'>
                <div className="container">
                    <div className="flex flex-col gap-6 max-w-5xl w-full mx-auto text-center sm:text-left">
                        {
                            laptopItems.map(laptopItem => <CategorySingleCard
                                key={laptopItem._id}
                                laptopItem={laptopItem}
                                setProductData={setProductData}
                            ></CategorySingleCard>)
                        }
                    </div>
                </div>
            </section>

            {/* Booking Modal */}

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className='absolute top-3 right-3 text-xl text-red-600 cursor-pointer'><FaRegTimesCircle /></label>
                    <h3 className="font-bold text-2xl text-center mb-5 pt-1">Fill the Form to Book the Product</h3>
                    <form onSubmit={handleSubmit(handleBooking)} className='flex flex-col gap-3'>
                        <div>
                            <p className="italic">User Name:</p>
                            <input name='name' type="text" defaultValue={user?.displayName} placeholder="name" className="input input-bordered py-2 h-auto w-full rounded-md" readOnly />
                        </div>
                        <div>
                            <p className="italic">Email Address:</p>
                            <input name='email' type="email" defaultValue={user?.email} placeholder="Email" className="input input-bordered py-2 h-auto w-full rounded-md" readOnly />
                        </div>
                        <div>
                            <p className="italic">Product Name:</p>
                            <input name='productName' type="text" defaultValue={productData?.name} placeholder="Product Name" className="input input-bordered py-2 h-auto w-full rounded-md" readOnly />
                        </div>
                        <div>
                            <p className="italic">Product Price ($):</p>
                            <input name='productPrice' type="number" defaultValue={productData?.resalePrice} placeholder="Product Price" className="input input-bordered py-2 h-auto w-full rounded-md" readOnly />
                        </div>
                        <div>
                            <p className="italic">Your Phone Number:</p>
                            <input type="tel" placeholder="Enter Your Phone Number" className="input input-bordered py-2 h-auto w-full rounded-md" required />
                        </div>
                        <div>
                            <p className="italic">Your Meeting Location:</p>
                            <input type="text" placeholder="Enter Your Meeting Location" className="input input-bordered py-2 h-auto w-full rounded-md" required />
                        </div>
                        <button type='submit'><label htmlFor="booking-modal" className="btn bg-secondary hover:bg-green-600 border-0 rounded-md capitalize text-white w-full text-lg">Submit Booking</label></button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default CategoryPage;