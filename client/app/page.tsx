'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import { blogs } from './data/blog';
import Blog from './components/Blog';
import Footer from './components/Footer';

const texts = ['Meeting Place', 'Place of Freedom', 'Filling Station'];
const images = [
    '/images/bible-the-way.jpg',
    '/images/worship.jpg',
    '/images/bible-the-way.jpg'
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('animate-slideIn');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % texts.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    return (
        <main>
            <Navigation />
            <section className='h-screen relative'>
                <Image
                    src={images[currentIndex]}
                    alt='Background'
                    className='w-full h-full object-cover transition-opacity duration-500 ease-in-out'
                    width={500}
                    height={500}
                    priority
                    quality={100}
                />
                <div className='text-8xl font-bold text-white uppercase absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'>
                    {texts[currentIndex]}
                </div>
            </section>

            <section className='flex justify-center items-center flex-wrap h-[60vh] w-4/5 m-auto'>
                <div className='relative w-96 ml-auto'>
                    <Image
                        src='/images/bible-the-way.jpg'
                        alt='Bible Image'
                        className='rounded-lg'
                        width={400}
                        height={400}
                        priority
                        quality={100}
                    />
                    <Image
                        src='/images/worship.jpg'
                        alt='Worship Image'
                        className='absolute top-[30%] left-[30%] rounded-lg'
                        width={400}
                        height={400}
                        priority
                        quality={100}
                    />
                </div>
                <div className='max-w-2xl flex flex-col items-start leading-8 p-4 m-auto flex-wrap'>
                    <h1 className='uppercase text-gray-700 text-2xl tracking-wider my-3'>
                        Our values
                    </h1>
                    <h1 className='text-5xl my-3 text-gray-700'>
                        <span className='uppercase tracking-wider'>God</span> is{' '}
                        <span className='uppercase tracking-wider'>love</span>
                    </h1>
                    <p className='text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec massa leo, rhoncus sed posuere sed, convallis at
                        lorem. Duis sed luctus est. Sed aliquam sodales metus
                        nec elementum. Morbi a purus quis nisi laoreet venenatis
                        sed vel mauris. Sed libero lacus, aliquet sit amet
                        tempus sit amet, sagittis ut est. Maecenas elementum
                        augue quis massa mollis, consequat egestas arcu tempus.
                        Nulla rutrum odio arcu, vitae mollis ipsum maximus eget.
                    </p>
                    <Button
                        type='button'
                        className='my-3 bg-gray-600 hover:bg-gray-700'
                    >
                        ABOUT US
                    </Button>
                </div>
            </section>
            <section className='flex justify-center flex-col flex-wrap h-[60vh] m-auto  bg-gradient-to-r from-slate-300 to-blue-500] -mb-16'>
                <div className='flex justify-center flex-col m-auto'>
                    <h1 className='my-8 text-4xl uppercase'>
                        The Sound of Our Worship
                    </h1>
                    <div className='flex overflow-hidden flex-wrap'>
                        <Image
                            src='/images/bible-the-way.jpg'
                            alt='Bible Image'
                            className='rounded-l-lg'
                            width={400}
                            height={400}
                            priority
                            quality={100}
                        />
                        <div className='bg-white p-4'>
                            <h1 className='my-4 text-2xl'>
                                He That Has Breath, Praise The Lord!
                            </h1>
                            <span className='text-gray-500'>Worship</span>
                            <audio controls className='my-8'>
                                <source
                                    src='/audios/random-praise.m4a'
                                    type='audio/mpeg'
                                />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>
            </section>
            {blogs && blogs.length ? (
                <section className='flex justify-center items-center flex-col bg-gray-100 py-8 mt-16'>
                    <div className='text-center'>
                        <h1 className='text-3xl uppercase mb-4'>
                            From our blog posts
                        </h1>
                        <h2 className='text-2xl text-gray-500'>Grace Chapel</h2>
                    </div>
                    <div className='flex justify-center items-center gap-6 py-8 flex-wrap'>
                        {blogs.map(blog => (
                            <Blog
                                key={blog.title}
                                author={blog.author}
                                title={blog.title}
                                postedOn={blog.postedOn}
                                imageUrl={blog.imageUrl}
                                comments={blog.comments}
                            />
                        ))}
                    </div>
                    <Button
                        type='button'
                        className='mt-4 mb-14 bg-gray-600 hover:bg-gray-700'
                    >
                        READ ALL ARTICLES
                    </Button>
                </section>
            ) : null}

            <Footer />
        </main>
    );
}
