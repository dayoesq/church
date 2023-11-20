import { Audio } from '@/data/audio';
import Image from 'next/image';

export default function AudioMessage({ ...props }: Audio) {
    return (
        <article className='mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4'>
            <div className='bg-white p-4 border-l-4 border-indigo-600'>
                <h1 className='my-4 text-2xl'>{props.title}</h1>
                <span className='text-gray-500'>{props.genre}</span>
                <audio controls className='my-8'>
                    <source src={props.audioUrl} type='audio/mpeg' />
                    Your browser does not support the audio element.
                </audio>
                {props.author && (
                    <p className='text-gray-500'>
                        Delivered by: {props.author}
                    </p>
                )}
            </div>
        </article>
    );
}
