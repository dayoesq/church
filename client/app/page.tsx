import Image from 'next/image';
import Button from './components/Button';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Navigation from './components/Navigation';
import Banner from './components/Banner';

export default function Home() {
    return (
        <main className='p-8'>
            <Navigation />
            {/* bg-[url('/images/hero-background.svg')] */}
            <section className='flex justify-center align-middle min-h-screen'>
                <div className='m-auto text-white'>
                    <h1 className='text-[10rem] text-gray-300 font-bold uppercase'>
                        choose
                    </h1>
                    <h2 className='text-4xl font-light text-gray-300'>the right way</h2>
                </div>
            </section>
        </main>
    );
}
