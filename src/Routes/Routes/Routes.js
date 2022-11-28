import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/DashboardLayout';
import Main from '../../Layout/Main';
import Blog from '../../Pages/Blog/Blog';
import AddProduct from '../../Pages/Dashboard/AddProduct/AddProduct';
import AllBuyers from '../../Pages/Dashboard/AllBuyers/AllBuyers';
import ManageSellersBuyers from '../../Pages/Dashboard/ManageSellersBuyers/ManageSellersBuyers';
import MyOrders from '../../Pages/Dashboard/MyOrders/MyOrders';
import MyProducts from '../../Pages/Dashboard/MyProducts/MyProducts';
import DisplayError from '../../Pages/Shared/DisplayError/DisplayError';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import AdminRoute from '../AdminRoute/AdminRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SellersRoute from '../SellersRoute/SellersRoute';
import SignUp from '../../Pages/SignUp/SignUp';
import CategoryPage from '../../Pages/CategoryPage/CategoryPage';
import AllSellers from '../../Pages/Dashboard/AllSellers/AllSellers';
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard';

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/category/:cateName',
                loader:({params})=>fetch(`http://localhost:5000/laptops/${params.cateName}`),
                element:<PrivateRoute><CategoryPage></CategoryPage></PrivateRoute>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement:<DisplayError></DisplayError>,
        children:[
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>
            },
            {
                path:'/dashboard/myorders',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/myproducts',
                element:<SellersRoute><MyProducts></MyProducts></SellersRoute>
            },
            {
                path:'/dashboard/addproduct',
                element:<SellersRoute><AddProduct></AddProduct></SellersRoute>
            },
            {
                path:'/dashboard/allbuyers',
                element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path:'/dashboard/allsellers',
                element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
            }
        ]
    }
])

export default router;