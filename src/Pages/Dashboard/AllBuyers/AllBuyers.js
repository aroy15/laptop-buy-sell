import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
    const [deletingBuyers, setDeletingBuyers] = useState(null);

    const closeModal = () => {
        setDeletingBuyers(null);
    }
    const url = 'https://b612-used-products-resale-server-side-aroy15.vercel.app/buyers';

    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteBuyer = buyer => {
        axios.delete(`https://b612-used-products-resale-server-side-aroy15.vercel.app/deleteUser/${buyer._id}`)
            .then(() => {
                refetch();
                toast.success(`Deleted Successfully: ${buyer.name}`);
            })
            .catch(err => toast.error(`Something working when deleting: ${err}`))
    }

    if (isLoading) {
        return <div className='py-52'>
            <Loading></Loading>
        </div>
    }
    return (
        <div className='mx-auto max-w-7xl py-10 px-5 xl:px-10'>
            <div className="overflow-x-auto">
                <h2 className="text-3xl font-bold text-center pb-5">All Buyer's Lists</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) => <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>
                                    <div className='flex'>
                                        <label onClick={() => setDeletingBuyers(buyer)} htmlFor="confirmation-modal" className="btn btn-sm bg-secondary text-white rounded-md flex gap-1 hover:bg-primary border-0 capitalize"><FaTrash /> Delete</label>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    deletingBuyers && <ConfirmationModal

                        title={`Buyer Name: ${deletingBuyers.name}`}
                        message={`Are you want to Delete? If yes the Buyer be deleted permanently.`}
                        successAction={handleDeleteBuyer}
                        successButtonName="Delete"
                        modalData={deletingBuyers}
                        closeModal={closeModal}
                    >
                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default AllBuyers;