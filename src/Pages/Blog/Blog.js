import React from 'react';

const Blog = () => {
    return (
        <section className='py-14'>
            <div className="container">
                <h2 className="text-4xl text-center font-bold pb-12">Blogs</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <article className='flex flex-col gap-3 px-5 py-6 bg-white shadow-xl border border-gray-300 rounded-xl'>
                        <h3 className='text-2xl font-bold'>What are the different ways to manage a state in a React application?</h3>
                        <p>When we talk about state in our applications, it’s important to be clear about what types of state actually matter.There are four main types of state you need to properly manage in your React apps:</p>
                        <p>Let's cover each of these in detail: 1. Local (UI) state – Local state is data we manage in one or another component, 2. Global (UI) state – Global state is data we manage across multiple components, 3.Server state – Data that comes from an external server that must be integrated with our UI state, 4. URL state – Data that exists on our URLs, including the pathname and query parameters.</p>
                    </article>
                    <article className='flex flex-col gap-3 px-5 py-6 bg-white shadow-xl border border-gray-300 rounded-xl'>
                        <h3 className='text-2xl font-bold'>How does prototypical inheritance work?</h3>
                        <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using</p>
                    </article>
                    <article className='flex flex-col gap-3 px-5 py-6 bg-white shadow-xl border border-gray-300 rounded-xl'>
                        <h3 className='text-2xl font-bold'>What is a unit test? Why should we write unit tests?</h3>
                        <p>Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.  The main objective of unit testing is to isolate written code to test and determine if it works as intended.</p>
                        <p>Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </article>
                    <article className='flex flex-col gap-3 px-5 py-6 bg-white shadow-xl border border-gray-300 rounded-xl'>
                        <h3 className='text-2xl font-bold'>React vs. Angular vs. Vue?</h3>
                        <p>Angular, developed by Google, was first released in 2010, making it the oldest of the lot. It is a TypeScript-based JavaScript framework. A substantial shift occurred in 2016 on the release of Angular 2 (and the dropping of the “JS” from the original name – AngularJS). Angular 2+ is known as just Angular. Although AngularJS (version 1) still gets updates, we will focus the discussion on Angular.</p>
                        <p>Vue, also known as Vue.js, is the youngest member of the group. It was developed by ex-Google employee Evan You in 2014. Over the last several years, Vue has seen a substantial shift in popularity, even though it doesn’t have the backing of a large company. The most current version is always announced on the official Vue website on their releases page. Contributors for Vue are supported by Patreon. It should be noted that Vue also has its own GitHub repo, and functions using TypeScript.</p>
                        <p>React, developed by Facebook, was initially released in 2013. Facebook uses React extensively in their products (Facebook, Instagram, and WhatsApp). Similar to Vue, the React developers also announce their newest version on the blog section of the React website.</p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Blog;