import Image from 'next/image';
import { CogIcon, KeyIcon, FlagIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const navItems = [{ name: 'Contacts', link: '/' }];

const icons = [
    {
        name: 'cog',
        link: '/',
        image: <CogIcon />
    },
    { name: 'key', link: '/', image: <KeyIcon /> },
    { name: 'flag', link: '/', image: <FlagIcon /> }
];

export default function Footer() {
    return (
        <footer className='bg-[#9fa09fd1] flex justify-center items-center gap-4 -mx-8 -my-8 h-96 text-white'>
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
                        className='text-white'
                        width={50}
                        height={24}
                        priority
                    />
                </a>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-2xl mb-4 uppercase'>Office</h1>
                <p>Vähä-hamenkatu 12, 20398</p>
                <p>Turku, Finland</p>
            </div>
            <div className='flex flex-col ml-10'>
                <h1 className='mb-4 text-2xl uppercase'>Links</h1>
                <ul>
                    {navItems.map(item => (
                        <Link href={item.link} key={item.name}>
                            <li
                                className='hover:underline hover:text-gray-600 my-2'
                                key={item.name}
                            >
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            {/* <div>
                <h1></h1>
                <ul>
                    {icons.map(icon => (
                        <li key={icon.name}>{icon.name}</li>
                    ))}
                </ul>
            </div> */}
        </footer>
    );
}
