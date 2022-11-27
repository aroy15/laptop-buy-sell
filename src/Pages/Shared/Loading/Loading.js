import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 mx-auto my-10 border-4 border-dashed border-light shadow-md rounded-full" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export default Loading;