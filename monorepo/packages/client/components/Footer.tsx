import {
    FaFacebook,
    FaXTwitter,
    FaInstagram,
    FaEnvelope,
    FaPhone,
    FaHeart
} from 'react-icons/fa6';

import { programmes } from '@/data/programme';
import Link from 'next/link';

const footerLinks = [
    { name: 'Contacts', link: '/contacts' },
    { name: 'Donations', link: '/donations' },
    { name: 'Events', link: '/events' },
    { name: 'Projects', link: '/projects' },
    { name: 'Gallery', link: '/galleries' },
    { name: 'Blog', link: '/blogs' }
];

export default function Footer() {
    return (
        <footer className='bg-gray-700 px-4'>
            <div className='flex flex-col border-b md:max-w-7xl m-auto'>
                <div className='flex justify-center text-white py-16 flex-col md:flex-row md:justify-between'>
                    <div className='my-4 tracking-wider'>
                        <h1 className='mb-6 uppercase'>Address</h1>
                        <p className='text-slate-400'>Vähä-hamenkatu 12,</p>
                        <p className='text-slate-400'>20398</p>
                        <p className='text-slate-400'>Turku, Finland</p>
                        <div className='flex items-center mt-4'>
                            <FaEnvelope className='h-4 w-4 fill-slate-400' />
                            <span className='text-slate-400 ml-2'>
                                <p>
                                    <a
                                        href='mailto:info@gracechapel.fi'
                                        target='_blank'
                                    >
                                        info@gracechapel.fi
                                    </a>
                                </p>
                            </span>
                        </div>
                        <div className='flex items-center mt-4'>
                            <FaPhone className='h-4 w-4 fill-slate-400' />
                            <span className='text-slate-400 ml-2'>
                                <p>+358-45-6352887</p>
                            </span>
                        </div>
                    </div>
                    <div className='my-4 tracking-wider'>
                        <h1 className='mb-6 uppercase'>Weekly Programmes</h1>
                        <ul>
                            {programmes.map(
                                programme =>
                                    programme.isTakingPlace && (
                                        <li
                                            key={programme.day}
                                            className='mb-4'
                                        >
                                            <p className='my-2'>
                                                {programme.day}
                                            </p>
                                            <p className='text-slate-400 text-sm'>
                                                {programme.title} {' | '}
                                                <span>
                                                    {programme.startsAt} -{' '}
                                                    {programme.endsAt}
                                                </span>
                                                {' | '} {programme.venue}
                                            </p>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                    <div className='my-4 tracking-wider'>
                        <h1 className='mb-6 uppercase'>Links</h1>
                        <ul>
                            {footerLinks.map(item => (
                                <li
                                    className='text-slate-400 mb-3 hover:text-slate-300'
                                    key={item.name}
                                >
                                    <Link href={item.link} key={item.name}>
                                        <p className='text-sm'>{item.name}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ul className='flex justify-center mb-6'>
                    <li className='cursor-pointer'>
                        <FaFacebook className='fill-blue-400 h-7 w-7' />
                    </li>
                    <li className='mx-6 cursor-pointer'>
                        <FaXTwitter className='fill-slate-200 h-7 w-7' />
                    </li>
                    <li className='cursor-pointer '>
                        <FaInstagram className='h-7 w-7 fill-pink-200' />
                    </li>
                </ul>
            </div>
            <p className='text-center py-10 text-white'>
                <small>&copy; {new Date().getFullYear()} gracechapel.fi</small>
            </p>
        </footer>
    );
}
