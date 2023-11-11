'use client';
import Button from '@/components/Button';
import Link from 'next/link';
import * as React from 'react';

export default function Page() {
    function submitForm(event: React.FormEvent) {
        event.preventDefault();
    }

    return (
        <div className='max-w-xl p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h1 className='uppercase text-center font-semibold text-2xl text-gray-600 mb-8'>
                Contact us!
            </h1>

            <form className='bg-white p-8 rounded shadow-md'>
                <div className='relative mb-4'>
                    <label
                        htmlFor='firstName'
                        className='absolute -top-3  left-2 text-gray-500 bg-white px-1'
                    >
                        First Name
                    </label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        // placeholder='e.g John'
                        className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder:text-sm'
                    />
                </div>

                <div className='relative mb-4'>
                    <label
                        htmlFor='lastName'
                        className='absolute -top-3  left-2 text-gray-500 bg-white px-1'
                    >
                        Last Name
                    </label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        // placeholder='e.g Doe'
                        className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder:text-sm'
                    />
                    <ul className='text-red-400 list-none text-sm my-2'>
                        <li className='border rounded p-1 mb-0.5 border-b-0'>
                            The first name is required.
                        </li>
                        <li className='border rounded p-1 mb-0.5 b'>
                            The first name is required.
                        </li>
                    </ul>
                </div>

                <div className='relative mb-4'>
                    <label
                        htmlFor='email'
                        className='absolute -top-3  left-2 text-gray-500 bg-white px-1'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        // placeholder='e.g john.doe@example.com'
                        className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder:text-sm'
                    />
                </div>

                <div className='flex justify-between items-center'>
                    <Button
                        type='submit'
                        className='bg-gray-600 hover:bg-gray-700'
                    >
                        Submit
                    </Button>
                    <Link
                        href='/'
                        className='text-blue-500 hover:text-blue-700'
                    >
                        back to home?
                    </Link>
                </div>
            </form>
        </div>
    );
}
