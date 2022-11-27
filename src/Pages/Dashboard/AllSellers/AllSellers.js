import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    const [deletingSellers, setDeletingSellers] = useState(null);

    const closeModal = () => {
        setDeletingSellers(null);
    }
    const url = 'http://localhost:5000/sellers';

    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
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

    const handleVerify = id =>{
        const url = `http://localhost:5000/verifySeller/${id}`;
        fetch(url, {
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({verify:true})
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount > 0){
                refetch()
                toast.success('User verified successfully')
            }
        })
        .catch(err => console.log(err))
    }

    const handleDeleteSeller = seller =>{
        axios.delete(`http://localhost:5000/deleteUser/${seller._id}`)
            .then(() => {
                refetch();
                toast.success(`Deleted Successfully: ${seller.name}`);
            })
            .catch(err => toast.error(`Something working when deleting: ${err}`))
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mx-auto max-w-7xl py-10 px-5 xl:px-10'>
            <div className="overflow-x-auto">
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
                            sellers.map((seller, i) => <tr key={seller._id}>
                                <th>{i+1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <label onClick={() => setDeletingSellers(seller)} htmlFor="confirmation-modal" className="btn btn-sm bg-secondary text-white rounded-md flex gap-1 hover:bg-primary border-0 capitalize"><FaTrash /> Delete</label>
                                        {
                                            seller?.verified ? <span className='text-green-600'>Verified</span>
                                                :
                                                <button onClick={() => handleVerify(seller._id)} className='btn btn-sm bg-secondary text-white rounded-md flex gap-1 hover:bg-primary border-0 capitalize'>Verify</button>
                                        }
    
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    deletingSellers && <ConfirmationModal

                        title={`Seller Name: ${deletingSellers.name}`}
                        message={`Are you want to Delete? If yes the seller be deleted permanently.`}
                        successAction={handleDeleteSeller}
                        successButtonName="Delete"
                        modalData={deletingSellers}
                        closeModal={closeModal}
                    >
                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default AllSellers;