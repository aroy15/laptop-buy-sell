import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const Dashboard = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className='mx-auto max-w-7xl py-10 px-5 xl:px-10 '>
            <h2 className="text-3xl text-center font-bold">Welcome <span className='text-green-600'>{user?.displayName}</span> to Laptop Buy and Sell Dashboard Management</h2>

            <div className='flex justify-center'>
                <img className='max-h-[700px] object-contain' src="https://raw.githubusercontent.com/aroy15/image-store/master/laptop/dashboard-image.webp" alt="" />
            </div>
        </div>
    );
};

export default Dashboard;