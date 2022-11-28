import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaRegTimesCircle } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import FormBtn from '../../components/FormBtn';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';
import CategoryBanner from './CategoryBanner';
import CategorySingleCard from './CategorySingleCard';

const CategoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    const [productData, setProductData] = useState(null);
    const { user } = useContext(AuthContext);


    const laptopItems = useLoaderData();

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const buyerName = form.name.value;
        const email = form.email.value;
        const productName = form.productName.value;
        const productPrice = form.productPrice.value;
        const phone = form.phone.value;
        const location = form.location.value;

        if (!phone) {
            return setErrorMessage('Phone number is required')
        }
        if (!location) {
            return setErrorMessage('Location Name is required')
        }

        const bookingDate = format(new Date(), 'PP');

        const bookingData = {
            buyerName,
            email,
            productName,
            productPrice,
            phone,
            location,
            bookingDate,
            productId: productData?._id,
            image: productData?.image,
            category: productData?.category,
        }
        console.log(bookingData)
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(bookingData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Product successfully booked')
                    document.querySelector('#booking-modal').checked = false;
                }
            })
            .catch(err => console.log(err))

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
                    <form onSubmit={handleBooking} className='flex flex-col gap-3'>
                        <div>
                            <p className="italic">User Name:</p>
                            <input name='name' type="text" defaultValue={user?.displayName} placeholder="name" className="input input-bordered py-2 h-auto w-full rounded-md" disabled readOnly />
                        </div>
                        <div>
                            <p className="italic">Email Address:</p>
                            <input name='email' type="email" defaultValue={user?.email} placeholder="Email" className="input input-bordered py-2 h-auto w-full rounded-md" disabled readOnly />
                        </div>
                        <div>
                            <p className="italic">Product Name:</p>
                            <input name='productName' type="text" defaultValue={productData?.name} placeholder="Product Name" className="input input-bordered py-2 h-auto w-full rounded-md" disabled readOnly />
                        </div>
                        <div>
                            <p className="italic">Product Price ($):</p>
                            <input name='productPrice' type="number" defaultValue={productData?.resalePrice} placeholder="Product Price" className="input input-bordered py-2 h-auto w-full rounded-md" disabled readOnly />
                        </div>
                        <div>
                            <p className="italic">Your Phone Number:</p>
                            <input name="phone" type="text" placeholder="Enter Your Phone Number" className="input input-bordered py-2 h-auto w-full rounded-md" required />
                        </div>
                        <div>
                            <p className="italic">Your Meeting Location:</p>
                            <input name="location" type="text" placeholder="Enter Your Meeting Location" className="input input-bordered py-2 h-auto w-full rounded-md" required />
                        </div>
                        <FormBtn type="submit">Submit Booking</FormBtn>
                    </form>
                    {errorMessage && <p className='text-red-600 pt-3'>{errorMessage}</p>}
                </div>
            </div>
        </>
    );
};

export default CategoryPage;