import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import CategoryBanner from './CategoryBanner';
import CategorySingleCard from './CategorySingleCard';

const CategoryPage = () => {
    const [loading, setLoading] = useState(true)

    const laptopItems = useLoaderData();



    // if (laptopItems.length) {
    //     setLoading(false)
    // }

    // if (loading) {
    //     return <div className="min-h-screen bg-base-200 flex justify-center items-center">
    //         <Loading></Loading>
    //     </div>
    // }

    return (
        <>
            <CategoryBanner laptopItems={laptopItems[0]}></CategoryBanner>
            <section className='py-16 bg-light'>
                <div className="container">
                    <div className="flex flex-col gap-6 max-w-5xl w-full mx-auto text-center sm:text-left">
                        {
                            laptopItems.map(laptopItem => <CategorySingleCard
                                key={laptopItem._id}
                                laptopItem={laptopItem}
                            ></CategorySingleCard>)
                        }
                    </div>
                    <input type="checkbox" id="booking-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                            <div className="modal-action">
                                <label htmlFor="booking-modal" className="btn">Yay!</label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CategoryPage;