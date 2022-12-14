import { useQuery } from '@tanstack/react-query';
import React from 'react';
import WhatWeDo from '../WhatWeDo/WhatWeDo';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import CategorySection from '../CategorySection/CategorySection';

const Home = () => {

    const { data: advertisedItems = [], isLoading } = useQuery({
        queryKey: ['advertisedItems'],
        queryFn: async () => {
            const res = await fetch('https://b612-used-products-resale-server-side-aroy15.vercel.app/advertise');
            const data = await res.json();
            return data;
        }
    })

    return (
        <>
            <Banner></Banner>
            {
                !isLoading &&
                advertisedItems.length > 0 && <Advertise
                    advertisedItems={advertisedItems}
                ></Advertise>
            }
            <CategorySection></CategorySection>
            <WhatWeDo></WhatWeDo>
        </>
    );
};

export default Home;