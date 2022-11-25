import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const CategorySection = () => {


    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            return data;
        }
    })

    const CategoryCard = ({categoryData}) => {
        const { category, categoryImage } = categoryData;

        return <div className="card bg-base-100 shadow-xl">
            <figure className="px-8 pt-8">
                <img src={categoryImage} alt={category} className="cate_logo" />
            </figure>
            <div className="card-body items-center text-center p-5">
                <h3 className="text-3xl text-secondary font-bold uppercase">{category}</h3>
                <div className="card-actions pt-3">
                    <Link to={`/category/${category}`} className="btn bg-secondary text-light hover:bg-primary rounded-xl">Show All</Link>
                </div>
            </div>
        </div>
    }

    return (
        <section className='py-16 bg-light'>
            <div className="container">
                <h2 className="text-4xl text-primary font-bold text-center mb-8">Laptop's Brand Category </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {
                        isLoading ? <Loading></Loading> 
                        :
                        categories.map(category => <CategoryCard
                            key={category._id}
                            categoryData={category}
                        ></CategoryCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default CategorySection;