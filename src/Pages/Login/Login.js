import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormBtn from '../../components/FormBtn';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken.js';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    // const [loginUserEmail, setLoginUserEmail] = useState('');
    // const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    // if (token) {
    //     navigate(from, { replace: true });
    // }

    const handleLogin = data => {
        console.log(data);
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    const handleGoogleSignIn = () =>{ 
        googleSignIn()
        .then(result => {
            const user = result.user;
            const userRole = 'buyer'
            const {displayName, email, photoURL} = user;
            saveUser(displayName, email, photoURL, userRole);
        })
        .catch(error => setLoginError(error.message))
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

                navigate('/')
            })
            .catch(err => setLoginError(err.message))
    }


    return (
        <section className='py-16 flex justify-center items-center bg-white'>
            <div className='max-w-md w-full p-7 shadow-lg border border-light rounded-lg'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered rounded-md w-full" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered rounded-md w-full" />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <FormBtn className="mt-4" type="submit">Login</FormBtn>
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p className='pt-3'>New to Laptop Buy Sell? <Link className='text-secondary' to="/signup">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full rounded-md border-2 flex gap-2 items-center justify-center'><FaGoogle /> Sign Up with google</button>
            </div>
        </section>
    );
};

export default Login;