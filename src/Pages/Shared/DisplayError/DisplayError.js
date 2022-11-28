import React, { useContext } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(err => console.log(err));
        //             
    }

    return (
        <div className="bg-gradient-to-r from-purple-300 to-blue-200">
            <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                    <div className="border-t border-gray-200 text-center pt-8">
                        <div className='max-w-xs mx-auto w-full'>
                            <img src="https://raw.githubusercontent.com/aroy15/image-store/master/404/404.webp" alt="" />
                        </div>
                        <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
                        <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. Please Sign out and get back</p>
                        <p className='text-red-400 text-2xl pb-8 px-12 font-medium'>Error Message: {error.statusText || error.message}</p>
                        <Link to='/' className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                            HOME
                        </Link>
                        <button onClick={handleLogOut} className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                            SIGN OUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayError;