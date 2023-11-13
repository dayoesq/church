'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import Button from '@/components/Button';
import Navigation from '@/components/Navigation';
import Banner from '@/components/Banner';
import { blogs } from '@/data/blog';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { events } from '@/data/event';
import Event from '@/components/Event';

const texts = ['Meeting Place', 'Place of Freedom', 'Filling Station'];
const images = [
    '/images/bible-the-way.jpg',
    '/images/worship.jpg',
    '/images/bible-the-way.jpg'
];

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % texts.length);
        }, 5000);

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
            {/* What we stand for */}
            <section className='flex justify-between items-center flex-wrap max-w-7xl m-auto py-8 px-4 my-20'>
                <div className='relative'>
                    <Image
                        src='/images/bible-the-way.jpg'
                        alt='Bible Image'
                        className='rounded-lg md:shrink-0'
                        width={400}
                        height={400}
                        priority
                        quality={100}
                    />
                    {/* <Image
                        src='/images/worship.jpg'
                        alt='Worship Image'
                        className='absolute top-[30%] left-[30%] rounded-lg 2xl:hidden'
                        width={400}
                        height={400}
                        priority
                        quality={100}
                    /> */}
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
                        Welcome to our online space dedicated to the
                        foundational truth that shapes our faith journey:
                        &ldquo;God is love.&ldquo; As your pastor, I am excited
                        to share with you the profound significance of this
                        simple yet powerful declaration that underpins the core
                        of our Christian beliefs. In the tapestry of our faith,
                        we find the threads of love intricately woven throughout
                        the pages of the Bible. From Genesis to Revelation, the
                        scriptures reveal God&rsquo;s unwavering love as the
                        heartbeat of our spiritual narrative. As it says in 1
                        John 4:8, &ldquo;Whoever does not love does not know
                        God, because God is love.&ldquo; This truth is not just
                        a theological concept; it is the essence of who our
                        Creator is—a boundless, unconditional love that
                        surpasses human understanding.
                    </p>
                    <Button
                        type='button'
                        className='my-3 bg-gray-600 hover:bg-gray-700'
                    >
                        ABOUT US
                    </Button>
                </div>
            </section>
            {/* Events */}
            {events && events.length > 0 && (
                <section className='flex justify-center flex-col flex-wrap m-auto bg-gradient-to-r from-yellow-50 to-transparent py-8 px-4 my-20'>
                    <div className='flex justify-between flex-wrap max-w-7xl mx-auto mb-8'>
                        <div className='h-fit w-fit'>
                            <h1 className='uppercase mb-4 text-gray-800 text-2xl font-bold'>
                                calendar
                            </h1>
                            <h2 className='uppercase font-bold text-gray-500'>
                                Our Events
                            </h2>
                        </div>
                        <div className='m-auto overflow-hidden w-2/4'>
                            <p className='leading-wider'>
                                Due to the fact that some of the events are
                                subject to change, prospective participants are
                                therefore advised to contact the church for any
                                possible registration procedures and changes.
                            </p>
                        </div>
                        <div>
                            <Button
                                type='button'
                                className='bg-gray-600 hover:bg-gray-700'
                            >
                                <div className='flex items-center'>
                                    <p>more</p>
                                    <FaArrowRight className='w-4 h-4 fill-white-500 ml-2' />
                                </div>
                            </Button>
                        </div>
                    </div>
                    <ul className='mx-auto'>
                        {events.map((event, index, eventsArr) => (
                            <li
                                key={event.id}
                                className={` ${
                                    index < events.length - 1 &&
                                    eventsArr.length >= 2
                                        ? 'border-b-2'
                                        : ''
                                }`}
                            >
                                <Event
                                    id={event.id}
                                    title={event.title}
                                    startsAt={event.startsAt}
                                    endsAt={event.endsAt}
                                    isFree={event.isFree}
                                    cost={event.cost}
                                    imageSource={event.imageSource}
                                    location={event.location}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {/* Sample Worship Sound */}
            <section className='my-20 py-8'>
                <h1 className='text-3xl my-10 uppercase text-center'>
                    The Sound of Our Worship
                </h1>
                <div className='m-auto max-w-7xl'>
                    <div className='flex justify-center flex-wrap'>
                        <Image
                            src='/images/bible-the-way.jpg'
                            alt='Bible Image'
                            className='rounded-l-lg object-cover'
                            width={300}
                            height={300}
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
            {/* The Gallery */}
            <section className='my-20 py-8'>
                <div className='max-w-7xl m-auto'>
                    <h1 className='text-3xl my-10 uppercase text-center'>
                        From the gallery
                    </h1>
                    <div className='flex justify-center flex-wrap'>
                        <div className='h-[30rem] w-[25rem] bg-red-500'>1</div>
                        <div className='h-[30rem] w-[25rem] bg-yellow-500'>
                            2
                        </div>
                        <div className='h-[30rem] w-[25rem] bg-red-500'>3</div>
                        <div className='h-[30rem] w-[25rem] bg-yellow-500'>
                            4
                        </div>
                        <div className='h-[30rem] w-[25rem] bg-red-500'>5</div>
                        <div className='h-[30rem] w-[25rem] bg-yellow-500'>
                            6
                        </div>
                    </div>
                </div>
            </section>
            {/* Audio sermons */}
            <section className='my-20 py-8'>
                <h1 className='text-3xl my-10 uppercase text-center'>
                    Latest Messages
                </h1>
                <div className='m-auto max-w-7xl'>
                    <div className='mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
                        <div className='md:flex'>
                            <div className='md:shrink-0'>
                                <Image
                                    src='/images/bible-the-way.jpg'
                                    alt='Jesus is the Way'
                                    className='rounded h-48 w-full object-cover md:h-full md:w-48'
                                    width={100}
                                    height={100}
                                    priority
                                    quality={100}
                                />
                            </div>
                            <div className='bg-white p-4'>
                                <h1 className='my-4 text-2xl'>
                                    He That Has Breath, Praise The Lord!
                                </h1>
                                <span className='text-gray-500'>Sermon</span>
                                <audio controls className='my-8'>
                                    <source
                                        src='/audios/random-praise.m4a'
                                        type='audio/mpeg'
                                    />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            </div>
                        </div>
                    </div>
                    {/* <div className='flex justify-center flex-wrap'>
                        <Image
                            src='/images/bible-the-way.jpg'
                            alt='Bible Image'
                            className='rounded'
                            width={100}
                            height={100}
                            priority
                            quality={100}
                            // style={props.imageStyle}
                        />
                        <div className='bg-white p-4'>
                            <h1 className='my-4 text-2xl'>
                                He That Has Breath, Praise The Lord!
                            </h1>
                            <span className='text-gray-500'>Sermon</span>
                            <audio controls className='my-8'>
                                <source
                                    src='/audios/random-praise.m4a'
                                    type='audio/mpeg'
                                />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div> */}
                </div>
            </section>
            {/* Latest and Popular Blog Posts*/}
            {blogs && blogs.length > 0 && (
                <section className='bg-gradient-to-r from-transparent to-gray-100  py-8 my-20'>
                    <div className='max-w-7xl m-auto'>
                        <div className='text-center'>
                            <h1 className='text-3xl uppercase my-10'>
                                From our blog posts
                            </h1>
                            <h2 className='text-2xl text-gray-500'>
                                Grace Chapel
                            </h2>
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
                            className='flex mt-4 mb-14 bg-gray-600 hover:bg-gray-700 m-auto'
                        >
                            READ ALL ARTICLES
                        </Button>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
}
