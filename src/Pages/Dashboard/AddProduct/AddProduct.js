import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import FormBtn from '../../../components/FormBtn';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddProduct = () => {
    
    const { user } = useContext(AuthContext);
    const [addProductLoading, setAddProductLoading] = useState(false);
    const [productError, setProductError] = useState('');
    const [categories, setCategories] = useState([]);
    const [verifySeller, setVerifySeller] = useState('');
    
    const { register, handleSubmit, formState: { errors } } = useForm();    

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
            .catch(err => console.log(err))
    }, [])

    // Check verified seller
    useEffect(()=>{
        fetch(`http://localhost:5000/users/seller/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setVerifySeller(data.isVerified);
                })
                .catch(err => console.log(err))
    },[user?.email])

    const imageHostKey = process.env.REACT_APP_imageHostKey

    const handleAddProduct = data => {
        setProductError('')
        setAddProductLoading(true);
        

        const newData = { ...data };
        delete newData?.image;

        const date = format(new Date(), 'PP');

        if (data.category === 'chooseCategory') {
            setAddProductLoading(false)
            return setProductError('please choose a category')
        }

        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append('image', imageFile)

        // Upload image on imgbb
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const image = imageData.data.url;
                    console.log(image)
                    
                    const {categoryImage} = categories.find(cate => cate.category === data.category);

                    console.log(categoryImage)


                    const finalData = {
                        ...newData,
                        image,
                        categoryImage,
                        postedTime: date,
                        advertise: false,
                        verified:verifySeller,
                        email: user?.email,
                        seller: user?.displayName
                    }
                    // post product to backend
                    fetch('http://localhost:5000/addProduct',{
                        method:'POST',
                        headers:{
                            'content-type':'application/json',
                            authorization:`bearer ${localStorage.getItem('accessToken')}`
                        },
                        body:JSON.stringify(finalData)
                    })
                    .then(res =>  res.json())
                    .then(data => {
                        console.log(data)  
                        if(data.acknowledged){
                            setAddProductLoading(false);
                            toast.success('Product Successfully added')
                            navigate('/dashboard/myproducts');
                        } 
                    })
                    .catch(err =>  setProductError(err));
                    console.log(finalData)
                }
            })
            .catch(err => setProductError(err))


    }

    return (
        <section className='py-16 px-5 xl:px-10 flex justify-center items-center bg-white'>
            <div className='max-w-5xl w-full p-7 shadow-lg border border-light rounded-lg'>
                <h2 className='text-2xl font-bold pb-2 text-center'>Add A Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Product Name is Required"
                        })} className="input input-bordered rounded-[5px!important] w-full" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Brand Category:</span></label>
                        <select {...register("category", {
                            required: true
                        })} className="select select-bordered w-full rounded-md">
                            <option value="chooseCategory">Choose Category</option>
                            {
                                categories.map(category => <option
                                    key={category._id}
                                    value={category.category}
                                >{category.category}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Product Condition:</span></label>
                        <select {...register("condition", {
                            required: "Product Condition required"
                        })} className="select select-bordered w-full rounded-md">
                            <option value="excellent">Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Product Image</span></label>
                        <input type="file" {...register("image", {
                            required: "Profile Picture is required"
                        })} className="file-input input-bordered rounded-[5px!important] w-full" accept="image/*"/>
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Location</span></label>
                        <input type="text" {...register("location", {
                            required: "Location is Required"
                        })} className="input input-bordered rounded-[5px!important] w-full" />
                        {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Years of Use</span></label>
                        <input type="number" {...register("yearsOfUse", {
                            required: "Years of use is Required"
                        })} className="input input-bordered rounded-[5px!important] w-full" />
                        {errors.yearsOfUse && <p className='text-red-500'>{errors.yearsOfUse.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Re-sale Price ($)</span></label>
                        <input type="number" {...register("resalePrice", {
                            required: "Re-sale Price is required"
                        })} className="input input-bordered rounded-[5px!important] w-full" />
                        {errors.resalePrice && <p className='text-red-500'>{errors.resalePrice.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Original Price ($)</span></label>
                        <input type="number" {...register("originalPrice", {
                            required: "Original Price is required"
                        })} className="input input-bordered rounded-[5px!important] w-full" />
                        {errors.originalPrice && <p className='text-red-500'>{errors.originalPrice.message}</p>}
                    </div>
                    <div className="form-control w-full col-span-full">
                        <label className="label"> <span className="label-text">Mobile Number</span></label>
                        <input type="text" {...register("mobile", {
                            required: "Mobile Number is required"
                        })} className="input input-bordered rounded-[5px!important] w-full" />
                        {errors.mobile && <p className='text-red-500'>{errors.mobile.message}</p>}
                    </div>
                    <div className="form-control w-full col-span-full">
                        <label className="label"> <span className="label-text">Product Description</span></label>
                        <textarea {...register("description", {
                            required: "Product Description is required"
                        })} className="input input-bordered rounded-[5px!important] w-full h-36 py-4"></textarea>
                        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    </div>

                    <FormBtn type="submit" className="my-4 col-span-full">{addProductLoading ? <Loading /> : 'Submit Product'}</FormBtn>
                    {productError && <p className='text-red-600'>{productError}</p>}
                </form>
            </div>
        </section >
    );
};

export default AddProduct;