import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaDollarSign, FaRegTimesCircle } from 'react-icons/fa';
import FormBtn from '../../../components/FormBtn';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import PaymentCheckoutForm from './PaymentCheckoutForm';

const stipePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const MyOrders = () => {
    // const [closingModal, setClosingModal] = useState(true);
    const [singleBooking, setSingleBooking] = useState({});


    const { user } = useContext(AuthContext);
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://b612-used-products-resale-server-side-aroy15.vercel.app/booking?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            });
            const data = await res.json();
            return data
        }
    })

    
    const closingModal = () => {
        setSingleBooking({})
        refetch();
    }

    if (isLoading) {
        return <div className='py-10'>
            <Loading></Loading>
        </div>
    }

    const bookingsPayment = booking => {
        console.log(booking);
        setSingleBooking(booking)
    }

    return (
        <div className='mx-auto max-w-7xl py-10 px-5 xl:px-10'>
            <h2 className="text-3xl text-center font-bold pb-8">My Orders</h2>
            {
                bookings.length === 0 ? <h3 className="text-2xl text-center text-red-600 text-bold py-8">No Orders found</h3>
                    :
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings.map((booking, i) => <tr key={booking._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="w-24">
                                                    <img src={booking.image} alt={booking.productName} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{booking.productName}</td>
                                        <td>${booking.productPrice}</td>
                                        <td>
                                            {
                                                booking.productPrice && !booking?.paid &&
                                                <label onClick={() => bookingsPayment(booking)} htmlFor="payment-modal" className="btn btn-sm bg-secondary text-white rounded-md inline-flex gap-1 hover:bg-primary border-0 capitalize"><FaDollarSign /> Pay</label>
                                            }
                                            {
                                                booking.productPrice && booking?.paid &&
                                                <span className='text-green-600 font-bold'>Paid</span>
                                            }
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
            {/* Payment Modal */}

            {
                singleBooking?.productPrice &&
                <>
                    <input type="checkbox" id="payment-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="payment-modal" className='absolute top-3 right-3 text-xl text-red-600 cursor-pointer'><FaRegTimesCircle /></label>
                            <h3 className="font-bold text-2xl text-center pt-1">Give Payment to purchase product</h3>
                            <h5 className="italic text-secondary pt-3 text-center">Product Name: {singleBooking.productName}</h5>
                            <h5 className="italic font-bold text-secondary pt-2 pb-8 text-center">Price: ${singleBooking.productPrice}</h5>
                            <Elements stripe={stipePromise}>
                                <PaymentCheckoutForm
                                    booking={singleBooking}
                                    closingModal={closingModal}
                                ></PaymentCheckoutForm>
                            </Elements>
                        </div>
                    </div>
                </>
            }

        </div>
    )
};

export default MyOrders;