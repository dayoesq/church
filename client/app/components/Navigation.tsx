import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Button from './Button';

const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Contact', link: '/' },
    { name: 'Donation', link: '/' },
    { name: 'Events', link: '/' },
    { name: 'Projects', link: '/' },
    { name: 'About us', link: '/about us' }
];

export default function Navigation() {
    return (
        <nav className='top-4 flex align-middle'>
            <div className='w-[5rem] h-[2.4rem]'>
                <a
                    className='inline-block'
                    href='#'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <Image
                        src='/rccg-logo.svg'
                        alt='RCCG Logo'
                        className='dark:invert'
                        width={50}
                        height={24}
                        priority
                    />
                </a>
            </div>

            <ul className='flex justify-between my-auto'>
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
            <div className='flex justify-between my-auto ml-auto cursor-pointer'>
                <MagnifyingGlassIcon color='grey' className='h-8 w-8' />
                <Button
                    type='button'
                    linkType='internal'
                    href='/donate'
                    className='ml-4 bg-orange-600 hover:bg-orange-700'
                >
                    Donate Now
                </Button>
            </div>
        </nav>
    );
}
