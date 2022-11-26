import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

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
    const handleDeleteProduct = product =>{
        console.log(product)
        axios.delete(`http://localhost:5000/deleteProduct/${product._id}`)
        .then(() => {
            refetch();
            toast.success(`Deleted Successfully: ${product.name}`);
        })
        .catch(err => toast.error(`Something working when deleting: ${err}`))
        // Dell Latitude 7480 Core i5 7th Gen Laptop	
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
                            <th>SL No.</th>
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
                                    <label onClick={() => setDeletingProduct(product)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white rounded-md">Delete</label>
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