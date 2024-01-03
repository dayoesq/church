import { EventProps } from '@/components/Event';
import Image from 'next/image';
import { FaCalendarDays, FaEnvelope, FaMobile, FaPhone } from 'react-icons/fa6';

export default function EventDetailsPage({ ...props }: EventProps) {
    return (
        <section className='my-20 py-8'>
            <div className='md:max-w-7xl m-auto px-4 sm:px-8 bg-slate-50 rounded-lg shadow-sm p-8'>
                <h1 className='my-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>
                    In defence of marriage
                </h1>
                <div className='flex justify-center'>
                    <FaCalendarDays
                        className='h-5 w-5 fill-slate-400 mr-4'
                        aria-hidden='true'
                    />
                    <p className='text-gray-500 mb-8'>
                        Oct 1, 2024 @ 11:30 am - May 2, 2025 @ 5:00 pm
                    </p>
                </div>
                <Image
                    src='/images/bible.jpg'
                    alt='Bible Image'
                    className='rounded w-full h-full'
                    width={100}
                    height={100}
                    priority
                    quality={100}
                />
                <p className='mt-6 text-lg leading-8 text-gray-700'>
                    Welcome to our online donation page! Your generosity enables
                    us to carry out the mission of our church and make a
                    positive impact in our community. As you give, remember the
                    words of 2 Corinthians 9:7: &quot;Each of you should give
                    what you have decided in your heart to give, not reluctantly
                    or under compulsion, for God loves a cheerful giver.&quot;
                    Thank you for partnering with us in spreading God&apos;s
                    love. Your contributions matter, and together, we can make a
                    difference.
                </p>
            </div>
            <div className='flex md:max-w-7xl m-auto px-4 sm:px-8 rounded-lg p-8'>
                <div>
                    <h1 className='text-lg font-bold mb-4'>Organizer</h1>
                    <p className='text-gray-500 '>Björn Bergvall</p>
                    <div className='flex items-center my-4'>
                        <FaPhone
                            className='h-5 w-5 fill-slate-400 mr-4'
                            aria-hidden='true'
                        />
                        <p className='text-gray-500'>0124125412</p>
                    </div>
                    <div className='flex items-center my-4'>
                        <FaEnvelope
                            className='h-5 w-5 fill-slate-400 mr-4'
                            aria-hidden='true'
                        />
                        <p className='text-gray-500'>info@gracechapel.fi</p>
                    </div>
                </div>
                <div className='ml-8'>
                    <h1 className='text-lg font-bold mb-4'>Venue</h1>
                    <p className='text-gray-500'>
                        Vähä-hamenkatu 12, 20398 Turku, Finland
                    </p>
                </div>
            </div>
        </section>
    );
}
