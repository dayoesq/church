'use client';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa6';
import Link from 'next/link';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function ContactPage() {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className='isolate bg-white px-6 py-24 sm:py-32 lg:px-8'>
            <div
                className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[-20rem]'
                aria-hidden='true'
            >
                <div
                    className='relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                    }}
                />
            </div>
            <div className='mx-auto max-w-2xl text-center'>
                <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    We are here to help
                </h2>
                <p className='mt-2 text-lg leading-8 text-gray-600'>
                    Aute magna irure deserunt veniam aliqua magna enim
                    voluptate.
                </p>
            </div>
            <form
                action='#'
                method='POST'
                className='mx-auto mt-16 max-w-xl sm:mt-20'
            >
                <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
                    <div>
                        <label
                            htmlFor='first-name'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            First name
                        </label>
                        <div className='mt-2.5'>
                            <input
                                type='text'
                                name='first-name'
                                id='first-name'
                                autoComplete='given-name'
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor='last-name'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Last name
                        </label>
                        <div className='mt-2.5'>
                            <input
                                type='text'
                                name='last-name'
                                id='last-name'
                                autoComplete='family-name'
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='email'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Email
                        </label>
                        <div className='mt-2.5'>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                autoComplete='email'
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                            />
                        </div>
                    </div>

                    <div className='sm:col-span-2'>
                        <label
                            htmlFor='message'
                            className='block text-sm font-semibold leading-6 text-gray-900'
                        >
                            Message
                        </label>
                        <div className='mt-2.5'>
                            <textarea
                                name='message'
                                id='message'
                                rows={4}
                                className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                defaultValue={''}
                            />
                        </div>
                    </div>
                    <Switch.Group
                        as='div'
                        className='flex gap-x-4 sm:col-span-2'
                    >
                        <div className='flex h-6 items-center'>
                            <Switch
                                checked={agreed}
                                onChange={setAgreed}
                                className={classNames(
                                    agreed ? 'bg-indigo-600' : 'bg-gray-200',
                                    'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                )}
                            >
                                <span className='sr-only'>
                                    Agree to policies
                                </span>
                                <span
                                    aria-hidden='true'
                                    className={classNames(
                                        agreed
                                            ? 'translate-x-3.5'
                                            : 'translate-x-0',
                                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </div>
                        <Switch.Label className='text-sm leading-6 text-gray-600'>
                            By selecting this, you agree to our{' '}
                            <Link
                                href='#'
                                className='font-semibold text-indigo-600'
                            >
                                privacy&nbsp;policy
                            </Link>
                            <Link
                                href='/'
                                className='ml-20 font-semibold text-indigo-600'
                            >
                                Back to home?
                            </Link>
                        </Switch.Label>
                    </Switch.Group>
                </div>
                <div className='mt-10'>
                    <button
                        type='button'
                        className='block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                        Let&apos;s talk
                    </button>
                </div>
            </form>
        </div>
    );
}

// 'use client';
// import Button from '@/components/Button';
// import Link from 'next/link';
// import * as React from 'react';

// export default function ContactPage() {

//     return (
//         <div className='max-w-xl p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
//             <h1 className='uppercase text-center font-semibold text-2xl text-gray-600 mb-8'>
//                 Contact us!
//             </h1>

//             <form className='bg-white p-8 rounded shadow-md'>
//                 <div className='relative mb-4'>
//                     <label
//                         htmlFor='firstName'
//                         className='absolute -top-3  left-2 text-gray-500 bg-white px-1'
//                     >
//                         First Name
//                     </label>
//                     <input
//                         type='text'
//                         id='firstName'
//                         name='firstName'
//                         // placeholder='e.g John'
//                         className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder:text-sm'
//                     />
//                 </div>

//                 <div className='relative mb-4'>
//                     <label
//                         htmlFor='lastName'
//                         className='absolute -top-3  left-2 text-gray-500 bg-white px-1'
//                     >
//                         Last Name
//                     </label>
//                     <input
//                         type='text'
//                         id='lastName'
//                         name='lastName'
//                         // placeholder='e.g Doe'
//                         className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder:text-sm'
//                     />
//                     <ul className='text-red-400 list-none text-sm my-2'>
//                         <li className='border rounded p-1 mb-0.5 border-b-0'>
//                             The first name is required.
//                         </li>
//                         <li className='border rounded p-1 mb-0.5 b'>
//                             The first name is required.
//                         </li>
//                     </ul>
//                 </div>

//                 <div className='relative mb-4'>
//                     <label
//                         htmlFor='email'
//                         className='absolute -top-3  left-2 text-gray-500 bg-white px-1'
//                     >
//                         Email
//                     </label>
//                     <input
//                         type='email'
//                         id='email'
//                         name='email'
//                         // placeholder='e.g john.doe@example.com'
//                         className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500 placeholder:text-sm'
//                     />
//                 </div>

//                 <div className='flex justify-between items-center'>
//                     <Button
//                         type='submit'
//                         className='bg-gray-600 hover:bg-gray-700'
//                     >
//                         Submit
//                     </Button>
//                     <Link
//                         href='/'
//                         className='text-blue-500 hover:text-blue-700'
//                     >
//                         back to home?
//                     </Link>
//                 </div>
//             </form>
//         </div>
//     );
// }
