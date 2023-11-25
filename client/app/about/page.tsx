'use client';
import DefaultBgImage from '@/components/DefaultBgImage';
import PrimaryHeaders from '@/components/PrimaryHeaders';
import TestimonialCard from '@/components/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import Image from 'next/image';
import { useState } from 'react';
import {
    FaCheck,
    Fa1,
    Fa2,
    Fa3,
    Fa4,
    Fa5,
    FaCircleDot,
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa6';

export default function AboutPage() {
    const historyImages = [
        '/images/worship.jpg',
        '/images/bible.jpg',
        '/images/bible-the-way.jpg'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex(
            prevIndex => (prevIndex + 1) % historyImages.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(
            prevIndex =>
                (prevIndex - 1 + historyImages.length) % historyImages.length
        );
    };
    return (
        <main>
            <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
                <DefaultBgImage />
                <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
                    <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                        <div className='lg:pr-4'>
                            <div className='lg:max-w-lg'>
                                <PrimaryHeaders
                                    title='About us'
                                    subTitle='We stand for the gospel'
                                />
                                <p className='mt-6 text-xl leading-8 text-gray-700'>
                                    We believe that the Bible is the written and
                                    the revealed Will of God. All the Bible
                                    teachings are holy, what the Bible reveals
                                    as the will of God are such that we should
                                    accept, and whatever God writes in the Bible
                                    and His Law are to remain unchangeable; for
                                    the Heavens and Earth may pass away but the
                                    Word of God stands forever. Matt. 24:34-38.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
                        <Image
                            className='w-[40rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[42rem]'
                            src='/images/bible.jpg'
                            height={100}
                            width={100}
                            alt='Image of people'
                        />
                    </div>
                    <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                        <div className='lg:pr-4'>
                            <div className='max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg'>
                                <ul
                                    role='list'
                                    className='space-y-8 text-gray-600'
                                >
                                    <li className='flex gap-x-3'>
                                        <span>
                                            <strong className='font-semibold text-gray-900'>
                                                About God.
                                            </strong>{' '}
                                            As revealed unto us by the Bible, we
                                            believe that there is only one God,
                                            Who is the Creator of the heaven and
                                            the earth – John 1:1-3. Only God
                                            will be in existence forever. Ez.
                                            3:14; in God every creature receives
                                            life -John 5:26.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <span>
                                            <strong className='font-semibold text-gray-900'>
                                                About Jesus Christ.
                                            </strong>{' '}
                                            We believe that He is the Son of
                                            God; Who took away our sins, and the
                                            Savior of the world. We also believe
                                            that Jesus is God and was born by
                                            Mary the Virgin. He is God revealed
                                            in the flesh. Through Him, all
                                            things were created – John 1:1-14.
                                            We believe in His death on the
                                            Cross, and resurrection, by which He
                                            brought redemption – Heb 9:26.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <span>
                                            <strong className='font-semibold text-gray-900'>
                                                About the Holy Spirit.
                                            </strong>{' '}
                                            The Holy Spirit is the third Person
                                            in the TRINITY. He has the same
                                            power, the same glory with God the
                                            Father and God the Son – John
                                            14:16-17. Three Persons that become
                                            one are the source of blessings to
                                            all the living creatures in Heaven
                                            and on earth – Matt. 28:19. This
                                            same Holy Spirit endows believers
                                            with gifts they can use.
                                        </span>
                                    </li>
                                </ul>
                                <ul
                                    role='list'
                                    className='mt-8 space-y-8 text-gray-600'
                                >
                                    <li className='flex gap-x-3'>
                                        <FaCheck
                                            className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                            aria-hidden='true'
                                        />
                                        <span>
                                            We want to be a Filling Station: A
                                            place where people can come and
                                            receive from God and not leave the
                                            same way they came.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <FaCheck
                                            className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                            aria-hidden='true'
                                        />
                                        <span>
                                            We want to be a Meeting Point: A
                                            place where there is room to meet, a
                                            place flavored with hospitality and
                                            care of each other.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <FaCheck
                                            className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                            aria-hidden='true'
                                        />
                                        <span>
                                            We want to be a Place of Freedom: A
                                            place free from restrictions of
                                            culture and traditions, a place
                                            where you are free to be the one you
                                            are and grow into the plans God has
                                            for you.
                                        </span>
                                    </li>
                                </ul>
                                <ul
                                    role='list'
                                    className='mt-8 space-y-8 text-gray-600'
                                >
                                    <p>We aim at achieving the following:</p>
                                    <li className='flex gap-x-3'>
                                        <div className='flex relative'>
                                            <Fa1
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <FaCircleDot
                                                className='mt-1 h-1 w-1 flex-none text-indigo-600 absolute top-4 left-5'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <span>To make heaven.</span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <div className='flex relative'>
                                            <Fa2
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <FaCircleDot
                                                className='mt-1 h-1 w-1 flex-none text-indigo-600 absolute top-4 left-5'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <span>
                                            To take many people as possible with
                                            us.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <div className='flex relative'>
                                            <Fa3
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <FaCircleDot
                                                className='mt-1 h-1 w-1 flex-none text-indigo-600 absolute top-4 left-5'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <span>
                                            To have a member of RCCG in every
                                            family of all nations.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <div className='flex relative'>
                                            <Fa4
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <FaCircleDot
                                                className='mt-1 h-1 w-1 flex-none text-indigo-600 absolute top-4 left-5'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <span>
                                            To accomplish No. 1 above, holiness
                                            will be our lifestyle. To accomplish
                                            No. 2 and 3 above, we will plant
                                            churches within five minutes walking
                                            distance in every city and town of
                                            developing countries and within five
                                            minutes driving distance in every
                                            city and town of developed
                                            countries.
                                        </span>
                                    </li>
                                    <li className='flex gap-x-3'>
                                        <div className='flex relative'>
                                            <Fa5
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <FaCircleDot
                                                className='mt-1 h-1 w-1 flex-none text-indigo-600 absolute top-4 left-5'
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <span>
                                            We will pursue these objectives
                                            until every Nation in the world is
                                            reached for the Lord Jesus Christ.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Our history section */}
            <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
                <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
                    <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                        <div className='lg:pr-4'>
                            <div className='lg:max-w-lg'>
                                <PrimaryHeaders
                                    title='Our history'
                                    subTitle='We belong to RCCG global'
                                />
                                <p className='mt-6 text-xl leading-8 text-gray-700'>
                                    Discover the remarkable journey of Grace
                                    Chapel Parish, a thriving community within
                                    the Redeemed Christian Church of God.
                                    Founded 14 years ago in response to a divine
                                    revelation received by Pastor Mercy of Jesus
                                    Center Parish, Grace Chapel has flourished
                                    under the dedicated leadership of Pastor
                                    Björn and Laura Bergval. This narrative of
                                    faith, unity, and spiritual growth reflects
                                    the congregation&apos;s unwavering
                                    commitment to the vision set by Pastor E.A
                                    Adeboye. From its inspired inception to
                                    becoming a radiant spiritual haven, Our
                                    history at Grace Chapel Parish is a
                                    testament to the transformative power of
                                    collective worship and divine providence.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
                        <div className='shrink-0 w-[40rem] sm:w-[42rem] h-[30rem]'>
                            <Image
                                className='max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 w-full h-full'
                                src={historyImages[currentImageIndex]}
                                height={100}
                                width={100}
                                alt='Image of people'
                            />
                        </div>
                        <div className='w-[10rem] bg-gray-200 h-10 flex justify-between items-center m-auto mt-4 p-4 rounded-3xl'>
                            <div
                                className='w-6 h-6 cursor-pointer'
                                onClick={handlePrevImage}
                            >
                                <FaChevronLeft
                                    className='h-full w-full text-indigo-600'
                                    aria-hidden='true'
                                />
                            </div>
                            <div
                                className='w-6 h-6 right-0 cursor-pointer'
                                onClick={handleNextImage}
                            >
                                <FaChevronRight
                                    className='h-full w-full text-indigo-600'
                                    aria-hidden='true'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                        <div className='lg:pr-4'>
                            <div className='max-w-xl text-base leading-8 text-gray-700 lg:max-w-lg'>
                                <p>
                                    Fourteen years ago, the seeds of Grace
                                    Chapel Parish were planted in the fertile
                                    soil of faith and divine inspiration. The
                                    inception of this vibrant congregation was
                                    not just a mere happenstance but a result of
                                    a profound revelation received by Pastor
                                    Mercy of Jesus Center Parish, nestled in the
                                    serene city of Turku, Finland. This divine
                                    encounter became the catalyst for the birth
                                    of Grace Chapel, a radiant beacon within the
                                    Redeemed Christian Church of God (RCCG)
                                    family, under the revered leadership of
                                    Pastor E.A Adeboye.{' '}
                                    <p className='mb-4'>
                                        Under the guidance of Pastor Björn
                                        Bergval and his wife, Laura Bergval,
                                        Grace Chapel Parish blossomed into a
                                        community rooted in love, faith, and
                                        unwavering commitment. Pastor Björn
                                        Bergval, a dedicated shepherd, has been
                                        instrumental in nurturing the spiritual
                                        growth of the parish, leading the
                                        congregation on a journey of profound
                                        transformation.
                                    </p>{' '}
                                    <p className='mb-4'>
                                        The story of Grace Chapel is one of
                                        steadfast dedication and divine
                                        providence. It is a tale of a community
                                        that emerged from the vision birthed in
                                        the heart of Pastor Mercy, radiating the
                                        light of faith across the Finnish
                                        landscape. The parish has become a
                                        testament to the power of unity and the
                                        strength found in collective worship. As
                                        the years unfolded, Grace Chapel has
                                        been a place of worship, fellowship, and
                                        spiritual enrichment.{' '}
                                    </p>
                                    <p className='mb-4'>
                                        The congregation&apos;s commitment to
                                        the teachings of RCCG and the vision set
                                        by Pastor E.A Adeboye has been
                                        unwavering, creating a spiritual haven
                                        where individuals find solace, purpose,
                                        and a sense of belonging. Our history at
                                        Grace Chapel Parish is not just a
                                        recounting of events; it is a narrative
                                        of divine orchestration, unwavering
                                        faith, and the tireless efforts of a
                                        devoted community. It stands as a
                                        testament to the transformative power of
                                        faith communities, where the seeds of
                                        revelation sown by Pastor Mercy have
                                        borne fruits of redemption, unity, and
                                        spiritual fulfillment.
                                    </p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonials section */}
            <section className='m-auto max-w-7xl mb-8 mt-10 px-6'>
                <PrimaryHeaders
                    title='Testimonials'
                    subTitle='What people say about us'
                />
                {testimonials && testimonials.length > 0 && (
                    <ul className='flex justify-center flex-wrap gap-4 my-8'>
                        {testimonials.map(testimonial => (
                            <li key={testimonial.id}>
                                <TestimonialCard
                                    id={testimonial.id}
                                    author={testimonial.author}
                                    quote={testimonial.quote}
                                    membership={testimonial.membership}
                                    imageUrl={testimonial.imageUrl}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}
