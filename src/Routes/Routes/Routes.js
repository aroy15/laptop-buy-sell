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
                element:<CategoryPage></CategoryPage>
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
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/allbuyers',
                element:<SellersRoute><AllBuyers></AllBuyers></SellersRoute>
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
                path:'/dashboard/managesellersbuyers',
                element:<AdminRoute><ManageSellersBuyers></ManageSellersBuyers></AdminRoute>
            },
        ]
    }
])

export default router;