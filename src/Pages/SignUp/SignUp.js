import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FormBtn from '../../components/FormBtn';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';
// import useToken from '../../hooks/useToken.js';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [signUpLoading, setSignUpLoading] = useState(false);

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    // const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();

    // if(token){
    //     navigate('/');
    // }

    const imageHostKey = process.env.REACT_APP_imageHostKey

    const handleSignUp = (userData) => {
        setSignUpLoading(true);

        const { name, email, password, image, userRole } = userData;
        const imageFile = image[0];
        const formData = new FormData();
        formData.append('image', imageFile)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        setSignUPError('');
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    console.log(imageData.data.url)
                    const photoURL = imageData.data.url;

                    createUser(email, password)
                        .then(result => {
                            const user = result.user;
                            console.log(user);
                            toast.success('User Created Successfully.')
                            const userInfo = {
                                displayName: name,
                                photoURL
                            }
                            updateUser(userInfo)
                                .then(() => {
                                    setSignUpLoading(false)
                                    saveUser(name, email, photoURL, userRole);
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(error => {
                            console.log(error)
                            setSignUPError(error.message)
                        });
                }

            })
    }

    const handleGoogleSignIn = () =>{ 
        googleSignIn()
        .then(result => {
            const user = result.user;
            const userRole = 'buyer'
            const {displayName, email, photoURL} = user;
            saveUser(displayName, email, photoURL, userRole);
            navigate('/')            
        })
        .catch(error => setSignUPError(error.message))
    }

    const saveUser = (name, email, photoURL, userRole) => {
        // const {name, email, photoURL, userRole} = userData;
        const user = { name, email, photoURL, userRole };
        fetch('https://b612-used-products-resale-server-side-aroy15.vercel.app/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
                navigate('/')
            })
            .catch(err => setSignUPError(err.message))
    }



    return (
        <section className='py-16 flex justify-center items-center bg-white'>
            <div className='max-w-md w-full p-7 shadow-lg border border-light rounded-lg'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-1">
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
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
                        })} className="file-input rounded-md w-full" accept="image/*"/>
                        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Sign Up as:</span></label>
                        <select {...register("userRole", {
                            required: true
                        })} className="select select-bordered w-full max-w-xs rounded-md">
                            <option defaultValue="buyer">buyer</option>
                            <option value="seller">seller</option>
                        </select>
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>

                    <FormBtn type="submit" className="my-4">{signUpLoading? <Loading/> : 'Sign Up'}</FormBtn>
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account? <Link className='text-secondary' to="/login">Please Login</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full rounded-md border-2 flex gap-2 items-center justify-center'><FaGoogle /> Sign Up with google</button>
            </div>
        </section>
    );
};

export default SignUp;