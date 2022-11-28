import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
            });
            const data = await res.json();
            return data
        }
    })
    if (isLoading) {
        return <div className='py-10'>
            <Loading></Loading>
        </div>
    }

    const bookingsPayment = booking =>{
        console.log(booking)
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
                                        <td><label onClick={() => bookingsPayment(booking)} htmlFor="confirmation-modal" className="btn btn-sm bg-secondary text-white rounded-md inline-flex gap-1 hover:bg-primary border-0 capitalize"><FaDollarSign /> Pay</label></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
};

export default MyOrders;