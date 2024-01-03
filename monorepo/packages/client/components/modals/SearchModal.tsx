import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { searchData } from '@/data/search-data';

type SearchModalProps = {
    show: boolean;
    onCancel: any;
    searchData: string[];
};

export default function SearchModal({ ...props }: SearchModalProps) {
    const cancelButtonRef = React.useRef(null);

    return (
        <Transition.Root show={props.show} as={React.Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={props.onCancel}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-end p-4 text-center sm:items-center sm:p-0 '>
                        <Transition.Child
                            as={React.Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg mx-auto'>
                                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start flex-col'>
                                        {/* Search form */}
                                        <form className='w-full'>
                                            <label
                                                htmlFor='search'
                                                className='block text-sm font-medium leading-6 text-gray-900'
                                            ></label>
                                            <div className='relative mt-2 rounded-md shadow-sm'>
                                                <input
                                                    type='text'
                                                    name='search'
                                                    id='search'
                                                    className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                                    placeholder='Place your search here.'
                                                />
                                            </div>
                                        </form>
                                        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                            <ul
                                                role='list'
                                                className='divide-y divide-gray-100'
                                            >
                                                {searchData.map(result => (
                                                    <li
                                                        key={result}
                                                        className='flex justify-between gap-x-6 py-5'
                                                    >
                                                        {result}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
