import React from 'react';
import './Advertise.css'
import AdvertiseSectionCard from './AdvertiseSectionCard';

const Advertise = ({advertisedItems}) => {
    
    return (
        <section className='py-16'>
            <div className="container">
                <h2 className="text-4xl text-primary font-bold text-center mb-8">Advertisement</h2>
                <div className="flex flex-col lg:flex-row flex-wrap justify-center max-w-5xl w-full mx-auto text-center sm:text-left">
                    {
                        advertisedItems.map(advertisedItem => <AdvertiseSectionCard
                            key={advertisedItem._id}
                            advertisedItem={advertisedItem}
                        ></AdvertiseSectionCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Advertise;