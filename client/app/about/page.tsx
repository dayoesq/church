import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Section from '@/components/Section';
import TestimonialCard from '@/components/TestimonialCard';
import { testimonials } from '@/data/testimonials';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';

export default function AboutPage() {
    return (
        <>
            <Navigation />
            <main>
                <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
                    <div className='absolute inset-0 -z-10 overflow-hidden'>
                        <svg
                            className='absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]'
                            aria-hidden='true'
                        >
                            <defs>
                                <pattern
                                    id='e813992c-7d03-4cc4-a2bd-151760b470a0'
                                    width={200}
                                    height={200}
                                    x='50%'
                                    y={-1}
                                    patternUnits='userSpaceOnUse'
                                >
                                    <path
                                        d='M100 200V.5M.5 .5H200'
                                        fill='none'
                                    />
                                </pattern>
                            </defs>
                            <svg
                                x='50%'
                                y={-1}
                                className='overflow-visible fill-gray-50'
                            >
                                <path
                                    d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
                                    strokeWidth={0}
                                />
                            </svg>
                            <rect
                                width='100%'
                                height='100%'
                                strokeWidth={0}
                                fill='url(#e813992c-7d03-4cc4-a2bd-151760b470a0)'
                            />
                        </svg>
                    </div>
                    <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
                        <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                            <div className='lg:pr-4'>
                                <div className='lg:max-w-lg'>
                                    <p className='text-base font-semibold leading-7 text-indigo-600'>
                                        About us
                                    </p>
                                    <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                                        We stand for the gospel
                                    </h1>
                                    <p className='mt-6 text-xl leading-8 text-gray-700'>
                                        Aliquet nec orci mattis amet quisque
                                        ullamcorper neque, nibh sem. At arcu,
                                        sit dui mi, nibh dui, diam eget aliquam.
                                        Quisque id at vitae feugiat egestas.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
                            <Image
                                className='w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]'
                                src='/images/bible.jpg'
                                height={100}
                                width={100}
                                alt=''
                            />
                        </div>
                        <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
                            <div className='lg:pr-4'>
                                <div className='max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg'>
                                    <p>
                                        Faucibus commodo massa rhoncus,
                                        volutpat. Dignissim sed eget risus enim.
                                        Mattis mauris semper sed amet vitae sed
                                        turpis id. Id dolor praesent donec est.
                                        Odio penatibus risus viverra tellus
                                        varius sit neque erat velit. Faucibus
                                        commodo massa rhoncus, volutpat.
                                        Dignissim sed eget risus enim. Mattis
                                        mauris semper sed amet vitae sed turpis
                                        id.
                                    </p>
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
                                                <strong className='font-semibold text-gray-900'>
                                                    Push to deploy.
                                                </strong>{' '}
                                                Lorem ipsum, dolor sit amet
                                                consectetur adipisicing elit.
                                                Maiores impedit perferendis
                                                suscipit eaque, iste dolor
                                                cupiditate blanditiis ratione.
                                            </span>
                                        </li>
                                        <li className='flex gap-x-3'>
                                            <FaCheck
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <span>
                                                <strong className='font-semibold text-gray-900'>
                                                    SSL certificates.
                                                </strong>{' '}
                                                Anim aute id magna aliqua ad ad
                                                non deserunt sunt. Qui irure qui
                                                lorem cupidatat commodo.
                                            </span>
                                        </li>
                                        <li className='flex gap-x-3'>
                                            <FaCheck
                                                className='mt-1 h-5 w-5 flex-none text-indigo-600'
                                                aria-hidden='true'
                                            />
                                            <span>
                                                <strong className='font-semibold text-gray-900'>
                                                    Database backups.
                                                </strong>{' '}
                                                Ac tincidunt sapien vehicula
                                                erat auctor pellentesque
                                                rhoncus. Et magna sit morbi
                                                lobortis.
                                            </span>
                                        </li>
                                    </ul>
                                    <p className='mt-8'>
                                        Et vitae blandit facilisi magna lacus
                                        commodo. Vitae sapien duis odio id et.
                                        Id blandit molestie auctor fermentum
                                        dignissim. Lacus diam tincidunt ac
                                        cursus in vel. Mauris varius vulputate
                                        et ultrices hac adipiscing egestas.
                                        Iaculis convallis ac tempor et ut. Ac
                                        lorem vel integer orci.
                                    </p>
                                    <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>
                                        No server? No problem.
                                    </h2>
                                    <p className='mt-6'>
                                        Id orci tellus laoreet id ac. Dolor,
                                        aenean leo, ac etiam consequat in.
                                        Convallis arcu ipsum urna nibh.
                                        Pharetra, euismod vitae interdum mauris
                                        enim, consequat vulputate nibh. Maecenas
                                        pellentesque id sed tellus mauris,
                                        ultrices mauris. Tincidunt enim cursus
                                        ridiculus mi. Pellentesque nam sed
                                        nullam sed diam turpis ipsum eu a sed
                                        convallis diam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='m-auto max-w-7xl mb-8 px-6'>
                    <h1 className='my-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                        Testimonials
                    </h1>
                    <ul className='flex justify-center flex-wrap gap-4 my-8'>
                        {testimonials &&
                            testimonials.length > 0 &&
                            testimonials.map(testimonial => (
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
                </div>
            </main>
            <Footer />
        </>
    );
}

// import Footer from '@/components/Footer';
// import Navigation from '@/components/Navigation';
// import Section from '@/components/Section';

// export default function AboutPage() {
//     return (
//         <>
//             <Navigation />
//             <main>
//                 <Section title='About Us'>
//                     <div className='md:max-w-7xl lg:max-w-7xl xl:max-w-7xl m-auto px-4 leading-8'>
//                         <div className='text-gray-700 px-8'>
//                             <p>
//                                 We believe that the Bible is the written and the
//                                 revealed Will of God. All the Bible teachings
//                                 are holy, what the Bible reveals as the will of
//                                 God are such that we should accept, and whatever
//                                 God writes in the Bible and His Law are to
//                                 remain unchangeable; for the Heavens and Earth
//                                 may pass away but the Word of God stands
//                                 forever. Matt. 24:34-38.
//                             </p>
//                             <h2 className='font-bold'>ABOUT GOD:</h2>{' '}
//                             <p>
//                                 As revealed unto us by the Bible, we believe
//                                 that there is only one God, Who is the Creator
//                                 of heaven and earth – John 1:1-3. Only God will
//                                 be in existence forever. Ez. 3:14; in God every
//                                 creature receives life -John 5:26.
//                             </p>{' '}
//                             <h2 className='font-bold'>ABOUT JESUS CHRIST:</h2>{' '}
//                             <p>
//                                 We believe that He is the Son of God; Who took
//                                 away our sins, and the Savior of the world. We
//                                 also believe that Jesus is God and was born by
//                                 Mary the Virgin. He is God revealed in the
//                                 flesh. Through Him, all things were created –
//                                 John 1:1-14. We believe in His death on the
//                                 Cross, and resurrection, by which He brought
//                                 redemption – Heb 9:26.
//                             </p>
//                             <h2 className='font-bold'>
//                                 ABOUT THE HOLY SPIRIT:
//                             </h2>{' '}
//                             <p>
//                                 The Holy Spirit is the third Person in the
//                                 TRINITY. He has the same power, the same glory
//                                 with God the Father and God the Son – John
//                                 14:16-17. Three Persons that become one are the
//                                 source of blessings to all the living creatures
//                                 in Heaven and on earth – Matt. 28:19. This same
//                                 Holy Spirit endows believers with gifts they can
//                                 use.
//                                 <ul className='list-disc'>
//                                     <li>
//                                         We want to be a Filling Station: A place
//                                         where people can come and receive from
//                                         God and not leave the same way they
//                                         came.
//                                     </li>
//                                     <li>
//                                         We want to be a Meeting Point: A place
//                                         where there is room to meet, a place
//                                         flavored with hospitality and care of
//                                         each other.
//                                     </li>
//                                     <li>
//                                         We want to be a Place of Freedom: A
//                                         place free from restrictions of culture
//                                         and traditions, a place where you are
//                                         free to be the one you are and grow into
//                                         the plans God has for you.
//                                     </li>
//                                     <li>
//                                         We aim at achieving the following:
//                                         <ul className='list-decimal px-8'>
//                                             <li>To make heaven.</li>
//                                             <li>
//                                                 To take as many people with us.
//                                             </li>
//                                             <li>
//                                                 To have a member of RCCG in
//                                                 every family of all nations.
//                                             </li>
//                                             <li>
//                                                 To accomplish No. 1 above,
//                                                 holiness will be our lifestyle.
//                                                 To accomplish No. 2 and 3 above,
//                                                 we will plant churches within
//                                                 five minutes walking distance in
//                                                 every city and town of
//                                                 developing countries and within
//                                                 five minutes driving distance in
//                                                 every city and town of developed
//                                                 countries.
//                                             </li>
//                                             <li>
//                                                 We will pursue these objectives
//                                                 until every Nation in the world
//                                                 is reached for the Lord Jesus
//                                                 Christ.
//                                             </li>
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </p>
//                         </div>
//                     </div>
//                 </Section>
//             </main>
//             <Footer />
//         </>
//     );
// }
