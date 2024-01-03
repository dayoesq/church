import { FaEnvelope, FaLocationPin, FaPhone } from 'react-icons/fa6';
import PrimaryHeaders from '@/components/PrimaryHeaders';

export default function ContactPage() {
    return (
        <section className='my-20 py-8 '>
            <div className='md:max-w-7xl m-auto px-4 sm:px-8 bg-slate-50 rounded-lg shadow-sm'>
                <div className='text-center pt-8'>
                    <PrimaryHeaders
                        title='contact'
                        subTitle='We are happy to help'
                    />
                </div>
                <div className='flex justify-center items-center flex-col md:gap-4 py-8 flex-wrap'>
                    <div className='flex justify-between items-center my-4 transition duration-300 transform hover:scale-105 rounded-lg bg-gray-100 w-full p-4 md:w-1/3 sm:w-full'>
                        <FaEnvelope
                            className='h-14 w-14 fill-slate-400'
                            aria-hidden='true'
                        />
                        <p className='text-lg font-medium text-gray-800 ml-4'>
                            info@gracechapel.fi
                        </p>
                    </div>

                    <div className='flex justify-between items-center my-4 transition duration-300 transform hover:scale-105 rounded-lg bg-gray-100 w-full p-4 md:w-1/3 sm:w-full'>
                        <FaPhone
                            className='h-14 w-14 fill-slate-400'
                            aria-hidden='true'
                        />
                        <p className='text-lg font-medium text-gray-800 ml-4'>
                            +358-45-6352887
                        </p>
                    </div>

                    <div className='flex justify-between items-center my-4 transition duration-300 transform hover:scale-105 rounded-lg bg-gray-100 p-4 w-full md:w-1/3 sm:w-full'>
                        <FaLocationPin
                            className='h-14 w-14 fill-slate-400'
                            aria-hidden='true'
                        />
                        <p className='text-lg font-medium text-gray-800 ml-4'>
                            Vähä-hamenkatu 12, 20398 Turku, Finland
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
