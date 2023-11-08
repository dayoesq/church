import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';
import { Blog } from '../data/blog';
import { getDate, getMonth } from '@/util/date';

type BlogProps = {
    title: string;
    author: string;
    postedOn: string;
    imageUrl: string;
    comments: string[];
};

export default function Blog({
    title,
    author,
    postedOn,
    imageUrl,
    comments
}: BlogProps) {
    return (
        <div
            key={title}
            className='relative rounded-lg border-2 shadow shadow-gray-300 hover:shadow-gray-200 cursor-pointer w-[25rem] h-[30rem] overflow-hidden'
        >
            <Image
                src={imageUrl}
                alt={title}
                className='mb-4 rounded-lg'
                width={400}
                height={500}
                priority
            />
            {/* Date tag */}
            <div className='absolute flex flex-col justify-center items-center w-18 bg-gray-500 bottom-[38%] right-0 p-2 font-bold text-white'>
                <p className='mb-1 text-3xl'>{getDate(postedOn)}</p>
                <p className='uppercase'>{getMonth(postedOn)}</p>
            </div>
            <div className='flex items-center m-6'>
                <p className='text-gray-500'>{author}</p>
                <span className='inline-block text-gray-500 m-2'>
                    {'-'} {comments.length} comments
                </span>
                <FaHeart className='fill-red-500 mx-1' />
                <small className='text-gray-500'>100</small>
            </div>
            <h1 className='text-2xl text-gray-600 m-6'>{title}</h1>
        </div>
    );
}
