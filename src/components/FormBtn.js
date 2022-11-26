import React from 'react';

const FormBtn = ({children, className, type}) => {
    return (
        <button type={type?type:'button'} className={`btn bg-secondary hover:bg-green-600 border-0 rounded-md capitalize text-white w-full text-lg ${className}`}>{children}</button>
    );
};

export default FormBtn;