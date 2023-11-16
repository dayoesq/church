import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';
// import { BlogPost } from '../data/blog';
import { getDate, getMonth } from '@/util/date';
import Link from 'next/link';

type BlogProps = {
    id: number;
    title: string;
    author: string;
    postedOn: string;
    imageUrl: string;
    comments: string[];
    content?: string;
};

export default function Blog({ ...props }: BlogProps) {
    return (
        <Link href={`/blogs/${props.id}`}>
            <article
                key={props.title}
                className='relative rounded-lg border-2 shadow shadow-gray-300 hover:shadow-gray-200 cursor-pointer md:w-[25rem] md:h-[30rem] overflow-hidden'
            >
                <div className='md:shrink-0 mb-4'>
                    <Image
                        src={props.imageUrl}
                        alt={props.title}
                        className='rounded-lg object-cover w-full md:w-full'
                        width={400}
                        height={300}
                        priority
                    />
                </div>
                {/* Date tag */}
                <div className='absolute flex flex-col justify-center items-center w-18 bg-gray-500 bottom-[38%] right-0 p-2 font-bold text-white'>
                    <p className='mb-1 text-3xl'>{getDate(props.postedOn)}</p>
                    <p className='uppercase'>{getMonth(props.postedOn)}</p>
                </div>
                <div className='flex items-center m-6'>
                    <p className='text-gray-500'>{props.author}</p>
                    <span className='inline-block text-gray-500 m-2'>
                        {'-'} {props.comments.length} comments
                    </span>
                    <FaHeart className='fill-red-500 mx-1' />
                    <small className='text-gray-500'>100</small>
                </div>
                <h1 className='text-2xl text-gray-600 m-6'>{props.title}</h1>
            </article>
        </Link>
    );
}
