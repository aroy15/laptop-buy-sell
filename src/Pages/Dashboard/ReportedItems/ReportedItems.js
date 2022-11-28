import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import { FaTrash } from 'react-icons/fa';

const ReportedItems = () => {
    const { user } = useContext(AuthContext);
    const [deletingReportedItem, setDeletingReportedItem] = useState(null);

    const closeModal = () => {
        setDeletingReportedItem(null);
    }


    const {data:reportedProduct=[], isLoading, refetch} = useQuery({
        queryKey:['reportedProduct'],
        queryFn:async () =>{
            const res = await fetch('http://localhost:5000/reportedProduct/',{
                headers:{
                    authorization:`bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })
    const handleDeleteProduct = product => {

        axios.delete(`http://localhost:5000/deleteProduct/${product._id}`)
            .then(() => {
                refetch();
                toast.success(`Deleted Reported Item Successfully: ${product.name}`);
            })
            .catch(err => toast.error(`Something working when deleting: ${err}`))
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mx-auto max-w-7xl py-10 px-5 xl:px-10'>
            <h2 className="text-3xl font-bold pb-8 text-center">Reported Items</h2>
            <div className="overflow-x-auto">
                <table className="table w-full" border="1">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th width='200'>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedProduct.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24">
                                        <img src={product.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>${product.resalePrice}</td>
                                <td>
                                    <div className="flex flex-col items-start gap-2">
                                        <label onClick={() => setDeletingReportedItem(product)} htmlFor="confirmation-modal" className="btn btn-sm bg-secondary text-white rounded-md flex gap-1 hover:bg-primary border-0 capitalize"><FaTrash /> Delete</label>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    deletingReportedItem && <ConfirmationModal

                        title={deletingReportedItem.name}
                        message={`Are you want to Delete this reported Item? Product Name: ${deletingReportedItem.name}. This will be deleted permanently.`}
                        successAction={handleDeleteProduct}
                        successButtonName="Delete"
                        modalData={deletingReportedItem}
                        closeModal={closeModal}
                    >
                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default ReportedItems;