import Image from 'next/image';
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
            className='relative rounded border-2 shadow shadow-gray-300 hover:shadow-gray-200 cursor-pointer w-[25rem] h-[30rem] overflow-hidden'
        >
            <Image
                src={imageUrl}
                alt={title}
                className='mb-4'
                width={400}
                height={500}
                priority
            />
            <div className='absolute flex flex-col justify-center items-center w-18 bg-gray-500 bottom-[50%] right-6 p-2 font-bold text-white'>
                <p className='mb-1 text-3xl'>{getDate(postedOn)}</p>
                <p className='uppercase'>{getMonth(postedOn)}</p>
            </div>
            <div className='flex m-6'>
                <p className='text-gray-500'>{author}</p>
                <span className='inline-block text-gray-500 ml-2'>
                    {'-'} {comments.length} comments
                </span>
            </div>
            <h1 className='text-2xl text-gray-600 m-6'>{title}</h1>
        </div>
    );
}
