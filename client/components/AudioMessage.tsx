import { Audio } from '@/data/audio';
import Image from 'next/image';

export default function AudioMessage({ ...props }: Audio) {
    return (
        <div className='mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4'>
            <div className='md:flex'>
                <div className='md:shrink-0'>
                    <Image
                        src={props.imageUrl}
                        alt={props.title}
                        className='rounded-l-sm h-48 w-full object-cover md:h-full md:w-48'
                        width={400}
                        height={100}
                        priority
                        quality={100}
                    />
                </div>
                <div className='bg-white p-4'>
                    <h1 className='my-4 text-2xl'>{props.title}</h1>
                    <span className='text-gray-500'>{props.genre}</span>
                    <audio controls className='my-8'>
                        <source src={props.audioUrl} type='audio/mpeg' />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </div>
    );
}
