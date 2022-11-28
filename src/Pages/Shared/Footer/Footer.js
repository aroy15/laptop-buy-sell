import React from 'react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png'

const Footer = () => {
    return (

        <footer className="p-4  sm:p-6 bg-gray-900 border-t border-gray-700">
            <div className="flex flex-col items-center">
                <div className="mb-6 md:mb-0">
                    <Link to='/' className="flex items-center">
                        <img src={logo} className="mr-3" alt="Website Logo" />
                    </Link>
                </div>
                <ul className="text-gray-400 flex gap-5 pt-8">
                    <li className="mb-4">
                        <Link to="/blogs" className="hover:underline">Blogs</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </li>
                </ul>
                
                <div className="flex mt-4 space-x-6 justify-center">
                    <a target='_blank' href="https://web.facebook.com/Anjon.Roy.Developer/" className="text-gray-500 hover:text-white text-xl">
                        <FaFacebook />
                        <span className="sr-only">Facebook page</span>
                    </a>
                    <a target='_blank' href="https://www.linkedin.com/in/anjon-roy" className="text-gray-500 hover:text-white text-xl">
                        <FaLinkedin />
                        <span className="sr-only">LinkedIn page</span>
                    </a>
                </div>
            </div>
            <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
            <div className="flex justify-center">
                <span className="text-sm sm:text-center text-gray-400">© 2022 <a href="/" className="hover:underline">Laptop Buy Sell</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    )
};

export default Footer;