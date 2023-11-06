'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Button from './Button';
import { useState } from 'react';

const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Contact', link: '/contacts' },
    { name: 'Donations', link: '/donations' },
    { name: 'Events', link: '/events' },
    { name: 'Projects', link: '/projects' },
    { name: 'About us', link: '/about' }
];

export default function Navigation() {
    const [showInput, setShowInput] = useState(false);

    function toggleSearchInput() {
        setShowInput(!showInput);
    }

    const inputClass = showInput ? 'visible opacity-1' : 'invisible opacity-0';

    return (
        <nav className='top-4 flex justify-between items-center'>
            <a
                className='inline-block'
                href='#'
                target='_blank'
                rel='noopener noreferrer'
            >
                <Image
                    src='/images/church-logo.png'
                    alt='RCCG Logo'
                    className='dark:invert'
                    width={100}
                    height={100}
                    priority
                    quality={100}
                />
            </a>

            <ul className='flex justify-between'>
                {navItems.map(item => (
                    <Link href={item.link} key={item.name}>
                        <li
                            className='mx-4 hover:underline hover:text-gray-600'
                            key={item.name}
                        >
                            {item.name}
                        </li>
                    </Link>
                ))}
            </ul>
            <div className='flex justify-between cursor-pointer gap-4'>
                <form>
                    <input
                        type='text'
                        name='search'
                        className={`border-2 p-1 ${inputClass}`}
                    />
                </form>
                <FaMagnifyingGlass
                    className='fill-slate-400 h-8 w-8'
                    onClick={toggleSearchInput}
                />
                <Button
                    type='button'
                    linkType='internal'
                    href='/donate'
                    className='bg-orange-600 hover:bg-orange-700'
                >
                    Donate Now
                </Button>
            </div>
        </nav>
    );
}
