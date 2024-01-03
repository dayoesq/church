import React from 'react';

const Maintenance = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='max-w-md p-8 bg-white shadow-md rounded-md'>
                <h1 className='text-4xl font-bold mb-4'>
                    Site Under Maintenance
                </h1>
                <p className='text-gray-600 mb-8'>
                    We're working hard to improve the site for you. Please check
                    back later.
                </p>
                <img
                    src='/maintenance.jpg'
                    alt='Maintenance'
                    className='w-full mb-8'
                />
                <p className='text-gray-600'>Thank you for your patience.</p>
            </div>
        </div>
    );
};

export default Maintenance;
