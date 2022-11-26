import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';
import { FaTrash } from 'react-icons/fa';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }
   
    const url = `http://localhost:5000/myProducts?email=${user?.email}`;
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
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
    const handleDeleteProduct = product => {
        console.log(product)
        axios.delete(`http://localhost:5000/deleteProduct/${product._id}`)
            .then(() => {
                refetch();
                toast.success(`Deleted Successfully: ${product.name}`);
            })
            .catch(err => toast.error(`Something working when deleting: ${err}`))
        // Dell Latitude 7480 Core i5 7th Gen Laptop	
    }

    const handleAdvertise = id => {
        const url = `http://localhost:5000/advertise/${id}`;
        fetch(url, {
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body:JSON.stringify({advertise:true})
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount > 0){
                refetch()
                toast.success('Product advertised successfully')
            }
        })
        .catch(err => console.log(err))
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='mx-auto max-w-5xl pt-10'>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="w-24">
                                        <img src={product.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{product.name}</td>
                                <td>${product.resalePrice}</td>
                                <td>
                                    <div className="flex gap-2">
                                        <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm bg-secondary text-white rounded-md flex gap-1 hover:bg-primary border-0 capitalize"><FaTrash /> Delete</label>
                                        {
                                            product.advertise ? <span className='text-green-600'>Advertised</span>
                                                :
                                                <button onClick={() => handleAdvertise(product._id)} className='btn btn-sm bg-secondary text-white rounded-md flex gap-1 hover:bg-primary border-0 capitalize'>Advertise</button>
                                        }

                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {
                    deletingProduct && <ConfirmationModal

                        title={deletingProduct.name}
                        message={`Are you want to Delete? ${deletingProduct.name}. This will be deleted permanently.`}
                        successAction={handleDeleteProduct}
                        successButtonName="Delete"
                        modalData={deletingProduct}
                        closeModal={closeModal}
                    >
                    </ConfirmationModal>
                }
            </div>
        </div>
    );
};

export default MyProducts;