import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import { blogs } from './data/blog';
import Blog from './components/Blog';
import Footer from './components/Footer';

export default function Home() {
    return (
        <main className='p-8'>
            <Navigation />
            <section className='h-[80vh]'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit'>
                    <h1 className='text-[15rem] text-gray-700 font-bold uppercase'>
                        Jesus
                    </h1>
                    <h2 className='text-4xl font-light text-gray-500 transition-opacity duration-500 ease-in-out'>
                        ...is the way
                    </h2>
                </div>
            </section>
            <section className='flex justify-center items-center -mx-8 bg-white px-4 flex-wrap'>
                <div className='relative m-auto w-[50rem]'>
                    <Image
                        src='/images/bible-the-way.jpg'
                        alt='Bible Image'
                        className=''
                        width={500}
                        height={500}
                        priority
                        quality={100}
                    />
                    <Image
                        src='/images/worship.jpg'
                        alt='Worship Image'
                        className='absolute top-[30%] left-[30%]'
                        width={500}
                        height={500}
                        priority
                        quality={100}
                    />
                </div>
                <div className='w-[50rem] flex flex-col items-start ml-8 leading-8 m-auto p-4 flex-wrap'>
                    <h1 className='uppercase text-gray-700 text-2xl tracking-wider my-3'>
                        Our values
                    </h1>
                    <h1 className='text-5xl my-3'>
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
                        Nunc viverra diam vel erat interdum, vel venenatis neque
                        tristique. Donec at lobortis nibh. Vivamus id egestas
                        ante. Orci varius natoque penatibus et magnis dis
                        parturient montes, nascetur ridiculus mus. Etiam
                        elementum massa diam, posuere imperdiet lacus lobortis
                        sit amet. Duis arcu turpis, fringilla sit amet pharetra
                        in, sollicitudin et urna.
                    </p>
                    <Button
                        type='button'
                        className='my-3 bg-gray-600 hover:bg-gray-700'
                    >
                        ABOUT US
                    </Button>
                </div>
            </section>
            {blogs && blogs.length ? (
                <section className='flex justify-center items-center flex-col bg-gray-100 -mx-8 py-8'>
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
            <section>
                <Footer />
            </section>
        </main>
    );
}
