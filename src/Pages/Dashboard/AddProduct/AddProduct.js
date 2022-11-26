import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormBtn from '../../../components/FormBtn';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const [addProductLoading, setAddProductLoading] = useState(false);
    const [productError, setProductError] = useState('');
    const [categories, setCategories] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imageHostKey

    useEffect(()=>{
        fetch('http://localhost:5000/categories')
        .then(res => res.json())
        .then(data => {
            setCategories(data)
        })
        .catch(err => console.log(err))
    },[])

    const handleAddProduct = data =>{
        setProductError('')
        setAddProductLoading(true);
        const {category, image} = data;

        if(category === 'chooseCategory'){
            setAddProductLoading(false)
          return  setProductError('please choose a category')
        }
        setProductError('');

        const imageFile = image[0];
        const formData = new FormData();
        formData.append('image', imageFile)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const photoURL = imageData.data.url;
                    console.log(photoURL)
                }
            })
            .catch(err => setProductError(err))
            
        const categoryImage =  categories.find(cate=> cate.category === category);
        
        console.log(categoryImage)
        setAddProductLoading(false);
    }

    return (
        <section className='py-16 flex justify-center items-center bg-white'>
            <div className='max-w-5xl w-full p-7 shadow-lg border border-light rounded-lg'>
                <h2 className='text-xl text-center'>Add A Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)} className="flex flex-col gap-1">
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Product Name is Required"
                        })} className="input input-bordered rounded-md w-full" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: "Email is Required"
                        })} className="input input-bordered rounded-md w-full" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            //pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered rounded-md w-full" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Profile Picture</span></label>
                        <input type="file" {...register("image", {
                            required: "Profile Picture is required"
                        })} className="file-input rounded-md w-full" />
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Sign Up as:</span></label>
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

                    <FormBtn type="submit" className="my-4">{addProductLoading ? <Loading /> : 'Sign Up'}</FormBtn>
                    {productError && <p className='text-red-600'>{productError}</p>}
                </form>
            </div>
        </section >
    );
};

export default AddProduct;