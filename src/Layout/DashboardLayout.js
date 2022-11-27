import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const menuClasses = 'bg-white hover:bg-primary rounded-[5px!important] hover:text-white shadow-md mb-2 py-3'

    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-white">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side bg-base-200 border-r border-gray-300">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-3/4 sm:w-80 text-base-content bg-base-200">
                        <li><Link to="/dashboard" className={menuClasses}>My Orders</Link></li>
                        {
                            <>
                                <li className=''><Link className={menuClasses} to="/dashboard/allsellers">All Sellers</Link></li>
                                <li className=''><Link className={menuClasses} to="/dashboard/allbuyers">All Buyers</Link></li>
                                <li className=''><Link className={menuClasses} to="/dashboard/myproducts">My Products</Link></li>
                                <li className=''><Link className={menuClasses} to="/dashboard/addproduct">Add A Product</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;