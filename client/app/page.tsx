import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from './components/Button';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Navigation from './components/Navigation';
import Banner from './components/Banner';
import Card from './components/Card';
import { blogs } from './data/blog';

export default function Home() {
    return (
        <main className="p-8 bg-[url('/images/hero-background.svg')]">
            <Navigation />
            <section className='flex justify-center align-middle min-h-[80vh]'>
                <div className='m-auto text-white'>
                    <h1 className='text-[15rem] text-gray-300 font-bold uppercase'>
                        Jesus
                    </h1>
                    <h2 className='text-4xl font-light text-gray-300 transition-opacity duration-500 ease-in-out'>
                        ...is the way
                    </h2>
                </div>
            </section>
            <section className='flex justify-center align-middle min-h-[80vh] -mx-8 bg-white'>
                <div className='flex relative m-auto w-[50rem]'>
                    <div className='p-4'>
                        <Image
                            src='/images/bible-the-way.jpg'
                            alt='Bible Image'
                            className=''
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <div className='absolute top-[30%] left-[30%] p-4'>
                        <Image
                            src='/images/worship.jpg'
                            alt='Worship Image'
                            className=''
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
                <div className='w-[50rem] flex flex-col items-start ml-8 leading-8 bg-cyan-50 m-auto p-4'>
                    <h1 className='uppercase text-gray-700 tracking-wider my-3'>
                        Our values
                    </h1>
                    <h1 className='text-5xl my-3'>
                        <span className='uppercase tracking-wider '>God</span>{' '}
                        is{' '}
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
            <section>
                <div>
                    <h1>From our blog posts</h1>
                    <h1>Grace Chapel</h1>
                </div>
                <div className='flex justify-center align-middle'>
                    {blogs.map(blog => (
                        <Card key={blog.title}>
                            <div className=''>
                                <Image
                                    src='/images/worship.jpg'
                                    alt={blog.title}
                                    className=''
                                    width={500}
                                    height={500}
                                    priority
                                />
                            </div>
                        </Card>
                    ))}
                </div>
                <Button type='button'>React all articles</Button>
            </section>
        </main>
    );
}
