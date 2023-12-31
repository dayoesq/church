'use client';
import { useState, Fragment } from 'react';
import { Dialog, Menu, Popover, Transition } from '@headlessui/react';
import { FaXmark, FaMagnifyingGlass, FaBars } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import SearchModal from './modals/SearchModal';
import { searchData } from '@/data/search-data';

const navigation = {
    pages: [
        { name: 'Home', href: '/' },
        { name: 'Contacts', href: '/contacts' },
        { name: 'Events', href: '/events' },
        { name: 'Blog', href: '/blogs' },
        { name: 'Projects', href: '/projects' },
        { name: 'About us', href: '/about' }
    ]
};

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);

    return (
        <>
            {show && (
                <SearchModal
                    show={show}
                    onCancel={() => setShow(false)}
                    searchData={searchData}
                />
            )}

            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-40 lg:hidden'
                    onClose={setOpen}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='transition-opacity ease-linear duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-linear duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 z-40 flex'>
                        <Transition.Child
                            as={Fragment}
                            enter='transition ease-in-out duration-300 transform'
                            enterFrom='-translate-x-full'
                            enterTo='translate-x-0'
                            leave='transition ease-in-out duration-300 transform'
                            leaveFrom='translate-x-0'
                            leaveTo='-translate-x-full'
                        >
                            <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                                <div className='flex px-4 pb-2 pt-5'>
                                    <button
                                        type='button'
                                        className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className='absolute -inset-0.5' />
                                        <span className='sr-only'>
                                            Close menu
                                        </span>
                                        <FaXmark
                                            className='h-6 w-6'
                                            aria-hidden='true'
                                        />
                                    </button>
                                </div>

                                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                                    {navigation.pages.map(page => (
                                        <ul
                                            key={page.name}
                                            className='flow-root'
                                        >
                                            <Link
                                                href={page.href}
                                                className='-m-2 block p-2 font-medium text-gray-900'
                                            >
                                                {page.name}
                                            </Link>
                                        </ul>
                                    ))}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className='relative bg-white'>
                <nav aria-label='Top' className='mx-auto px-4 sm:px-6 lg:px-8 '>
                    <div className='border-b border-gray-200'>
                        <div className='flex h-16 items-center'>
                            <button
                                type='button'
                                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
                                onClick={() => setOpen(true)}
                            >
                                <span className='absolute -inset-0.5' />
                                <span className='sr-only'>Open menu</span>
                                <FaBars
                                    className='h-6 w-6'
                                    aria-hidden='true'
                                />
                            </button>

                            {/* Logo */}
                            <div className='ml-4 flex lg:ml-0'>
                                <Link href='/'>
                                    <span className='sr-only'>
                                        RCCG Grace Chapel Logo
                                    </span>
                                    <Image
                                        className='h-12 w-auto'
                                        src='/images/rccg-logo.png'
                                        alt='RCCG Grace Chapel Logo'
                                        width={100}
                                        height={100}
                                        quality={100}
                                    />
                                </Link>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                                <div className='flex h-full space-x-8'>
                                    {navigation.pages.map(page => (
                                        <Link
                                            key={page.name}
                                            href={page.href}
                                            className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:underline'
                                        >
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </Popover.Group>

                            <div className='ml-auto flex items-center'>
                                {/* Search */}
                                <div className='flex lg:ml-6'>
                                    {/* <div className='p-2 text-gray-400 hover:text-gray-500'>
                                        <span className='sr-only'>Search</span>
                                        <FaMagnifyingGlass
                                            className='h-6 w-6'
                                            aria-hidden='true'
                                            onClick={() => setShow(true)}
                                        />
                                    </div> */}
                                    <Button
                                        type='button'
                                        linkType='internal'
                                        href='/donations'
                                        className='bg-orange-600 hover:bg-orange-700 ml-4'
                                    >
                                        Donate
                                    </Button>
                                </div>
                            </div>
                            {/* Profile dropdown */}
                            <Menu as='div' className='relative ml-3'>
                                {/* <div>
                                    <Menu.Button className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                        <span className='absolute -inset-1.5' />
                                        <span className='sr-only'>
                                            Open user menu
                                        </span>
                                        <Image
                                            className='h-8 w-8 rounded-full'
                                            src='/images/avatar.jpeg'
                                            alt='Avatar'
                                            width={100}
                                            height={100}
                                        />
                                    </Menu.Button>
                                </div> */}
                                <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-100'
                                    enterFrom='transform opacity-0 scale-95'
                                    enterTo='transform opacity-100 scale-100'
                                    leave='transition ease-in duration-75'
                                    leaveFrom='transform opacity-100 scale-100'
                                    leaveTo='transform opacity-0 scale-95'
                                >
                                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href='#'
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    Your Profile
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href='#'
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    Settings
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href='#'
                                                    className={classNames(
                                                        active
                                                            ? 'bg-gray-100'
                                                            : '',
                                                        'block px-4 py-2 text-sm text-gray-700'
                                                    )}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}
