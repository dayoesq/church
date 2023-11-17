'use client';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';
import Button from '@/components/Button';
import AudioMessage from '@/components/AudioMessage';
import { blogs } from '@/data/blog';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import { events } from '@/data/event';
import Event from '@/components/Event';
import { Audio, audios } from '@/data/audio';
import Section from '@/components/Section';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { image: '/images/worship.jpg', text: 'place of freedom' },
        { image: '/images/bible.jpg', text: 'filling station' },
        { image: '/images/bible-the-way.jpg', text: 'meeting place' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    function getAudio(genre: Audio['genre']) {
        if (audios && audios.length > 0) {
            return audios.filter(audio => audio.genre === genre);
        }
    }

    return (
        <>
            <Navigation />
            <main>
                {/* Hero */}
                <section className='relative overflow-hidden h-screen'>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                                currentSlide === index
                                    ? 'opacity-1'
                                    : 'opacity-0'
                            }`}
                            style={{
                                backgroundImage: `url(${slide.image})`
                            }}
                        >
                            <div className='container mx-auto h-full flex items-center justify-center relative z-10 text-center'>
                                <h2 className='text-7xl font-bold leading-tight mb-4 uppercase lg:text-9xl md:text-9xl text-white'>
                                    {slide.text}
                                </h2>
                            </div>
                        </div>
                    ))}
                </section>
                {/* What we stand for */}
                <section className='md:flex justify-between items-center flex-wrap md:max-w-7xl m-auto py-8 px-4 my-20 md:items-center'>
                    <div className='md:shrink-0'>
                        <Image
                            src='/images/bible-the-way.jpg'
                            alt='Bible Image'
                            className='rounded-lg object-cover w-full md:w-full md:h-60'
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
                            <span className='uppercase tracking-wider'>
                                God
                            </span>{' '}
                            is{' '}
                            <span className='uppercase tracking-wider'>
                                love
                            </span>
                        </h1>
                        <p className='text-gray-700'>
                            Welcome to our online space dedicated to the
                            foundational truth that shapes our faith journey:
                            &ldquo;God is love.&ldquo; As your pastor, I am
                            excited to share with you the profound significance
                            of this simple yet powerful declaration that
                            underpins the core of our Christian beliefs. In the
                            tapestry of our faith, we find the threads of love
                            intricately woven throughout the pages of the Bible.
                            From Genesis to Revelation, the scriptures reveal
                            God&rsquo;s unwavering love as the heartbeat of our
                            spiritual narrative. As it says in 1 John 4:8,
                            &ldquo;Whoever does not love does not know God,
                            because God is love.&ldquo; This truth is not just a
                            theological concept; it is the essence of who our
                            Creator is—a boundless, unconditional love that
                            surpasses human understanding.
                        </p>

                        <Link href='/about'>
                            <Button
                                type='button'
                                className='my-3 bg-gray-600 hover:bg-gray-700'
                            >
                                ABOUT US
                            </Button>
                        </Link>
                    </div>
                </section>
                {/* Events */}
                {events && events.length > 0 && (
                    <section className='flex justify-center flex-col flex-wrap m-auto bg-gradient-to-r from-yellow-50 to-transparent py-8 px-4 my-20'>
                        <div className='flex justify-between flex-wrap md:max-w-7xl mx-auto mb-8'>
                            <div className='h-fit w-fit'>
                                <h1 className='uppercase mb-4 text-gray-800 text-2xl font-bold'>
                                    Calendar
                                </h1>
                                <h2 className='uppercase font-bold text-gray-500'>
                                    Our Events
                                </h2>
                            </div>
                            <div className='m-auto overflow-hidden w-2/4'>
                                <p className='leading-wider'>
                                    Due to the fact that some of the events are
                                    subject to change, prospective participants
                                    are therefore advised to contact the church
                                    for any possible registration procedures and
                                    changes.
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
                {getAudio('worship') && getAudio('worship').length > 0 && (
                    <Section title='Our Worship'>
                        <div className='m-auto md:max-w-7xl px-4'>
                            <ul>
                                {getAudio('worship').map(audio => (
                                    <li key={audio.id}>
                                        <AudioMessage
                                            id={audio.id}
                                            key={audio.id}
                                            title={audio.title}
                                            imageUrl={audio.imageUrl}
                                            audioUrl={audio.audioUrl}
                                            genre={audio.genre}
                                            author={audio.author}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Section>
                )}
                {/* The Gallery */}
                <section>
                    <div className='md:max-w-7xl lg:max-w-7xl xl:max-w-7xl m-auto px-4'>
                        <div className='flex justify-center flex-wrap'>
                            <div className='h-[30rem] md:w-[25rem] w-full bg-red-500'>
                                1
                            </div>
                            <div className='h-[30rem] lg:w-[25rem] md:w-[25rem] w-full bg-yellow-500'>
                                2
                            </div>
                            <div className='h-[30rem] md:w-[25rem] w-full bg-red-500'>
                                3
                            </div>
                            <div className='h-[30rem] md:w-[25rem] w-full bg-yellow-500'>
                                4
                            </div>
                            <div className='h-[30rem] md:w-[25rem] w-full bg-red-500'>
                                5
                            </div>
                            <div className='h-[30rem] md:w-[25rem] w-full bg-yellow-500'>
                                6
                            </div>
                        </div>
                    </div>
                </section>
                {/* Audio sermons */}
                {getAudio('sermon')?.length > 0 && (
                    <Section title='Latest Messages'>
                        <div className='m-auto max-w-7xl px-4 mb-8'>
                            <ul>
                                {getAudio('sermon').map(audio => (
                                    <li key={audio.id}>
                                        <AudioMessage
                                            id={audio.id}
                                            key={audio.id}
                                            title={audio.title}
                                            imageUrl={audio.imageUrl}
                                            audioUrl={audio.audioUrl}
                                            genre={audio.genre}
                                            author={audio.author}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link href='/sermons'>
                            <Button
                                type='button'
                                className='flex mt-4 mb-14 bg-gray-600 hover:bg-gray-700 m-auto'
                            >
                                MORE MESSAGES
                            </Button>
                        </Link>
                    </Section>
                )}
                {/* Latest and Popular Blog Posts*/}
                {blogs && blogs.length > 0 && (
                    <Section
                        title='From our blog posts'
                        className='bg-gradient-to-r from-transparent to-gray-100'
                    >
                        <div className='md:max-w-7xl m-auto px-4'>
                            <div className='text-center'>
                                <h2 className='text-2xl text-gray-500'>
                                    Grace Chapel
                                </h2>
                            </div>
                            <ul className='flex justify-center items-center md:gap-4 py-8 flex-wrap gap-y-4'>
                                {blogs.map(blog => (
                                    <li key={blog.id}>
                                        <Blog
                                            id={blog.id}
                                            author={blog.author}
                                            title={blog.title}
                                            postedOn={blog.postedOn}
                                            imageUrl={blog.imageUrl}
                                            comments={blog.comments}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <Link href='/blogs'>
                                <Button
                                    type='button'
                                    className='flex mt-4 mb-14 bg-gray-600 hover:bg-gray-700 m-auto'
                                >
                                    READ ALL ARTICLES
                                </Button>
                            </Link>
                        </div>
                    </Section>
                )}
            </main>
            <Footer />
        </>
    );
}
