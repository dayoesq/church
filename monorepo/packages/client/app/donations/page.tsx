import PrimaryHeaders from '@/components/PrimaryHeaders';

export default function DonationsPage() {
    return (
        <section className='my-20 py-8 '>
            <div className='md:max-w-7xl m-auto px-4 sm:px-8 bg-slate-50 rounded-lg shadow-sm'>
                <div className='flex flex-center'>
                    <div className='flex flex-col items-center lg:max-w-lg m-auto pt-8'>
                        <PrimaryHeaders
                            title='Donations'
                            subTitle='There is joy in giving'
                        />
                        <p className='mt-6 text-lg leading-8 text-gray-700'>
                            Welcome to our online donation page! Your generosity
                            enables us to carry out the mission of our church
                            and make a positive impact in our community and all across the globe. As you
                            give, remember the words of 2 Corinthians 9:7:
                            &quot;Each of you should give what you have decided
                            in your heart to give, not reluctantly or under
                            compulsion, for God loves a cheerful giver.&quot;
                            Thank you for partnering with us in spreading
                            God&apos;s love. Your contributions matter, and
                            together, we can make a difference.
                        </p>
                    </div>
                </div>
                <div className='flex justify-center items-center flex-col md:gap-4 py-8 flex-wrap'>
                    <div className='flex flex-col my-4 transition duration-300 transform hover:scale-105 rounded-lg bg-gray-100 p-4 md:w-1/3 sm:w-full'>
                        <h1 className='text-base font-semibold leading-7 text-indigo-600 uppercase'>
                            Beneficiary
                        </h1>
                        <p className='text-xl font-medium text-gray-800'>
                            Grace Chapel, RCCG Turku
                        </p>
                    </div>
                    <div className='flex flex-col my-4 transition duration-300 transform hover:scale-105 rounded-lg bg-gray-100 p-4 md:w-1/3 sm:w-full'>
                        <h1 className='text-base font-semibold leading-7 text-indigo-600 uppercase'>
                            Account Number
                        </h1>
                        <p className='text-xl font-medium text-gray-800'>
                            FI 82 8200 4710 5323 94
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
