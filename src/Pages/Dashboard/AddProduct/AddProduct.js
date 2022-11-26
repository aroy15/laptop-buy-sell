import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const AddProduct = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <form  className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <input type="text" name="firstName" placeholder="First Name" className="input input-md text-xl h-16" required />
                <input type="text" name="lastName" placeholder="Last Name" className="input input-md text-xl h-16" required />
                <input type="tel" name="phone" placeholder="Your Phone" className="input input-md text-xl h-16" required />
                <input type="email" name="email" placeholder="Your Email" defaultValue={user?.email} className="input input-md text-xl h-16" readOnly />
                <textarea name="message" className="textarea col-span-full text-xl h-40" placeholder="Your Message" required></textarea>
                <input className='btn border-0 bg-orange-600 hover:bg-orange-700 h-16 col-span-full' type="submit" value="Order Confirm" />
            </form>
        </div>
    );
};

export default AddProduct;