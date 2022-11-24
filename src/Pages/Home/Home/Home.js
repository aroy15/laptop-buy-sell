import React from 'react';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Advertise></Advertise>
            <CategorySection></CategorySection>
        </>
    );
};

export default Home;