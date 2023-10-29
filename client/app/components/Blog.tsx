import Image from 'next/image';
import { Blog } from '../data/blog';

type BlogProps = {
    blog: Blog;
};

export default function Blog({ blog }: BlogProps) {
    return (
        <div className='rounded'>
            <Image
                src={blog.imageUrl}
                alt={blog.title}
                className='mb-4'
                width={500}
                height={500}
                priority
            />
            <div className='flex mb-4'>
                <p className='text-gray-500 uppercase'>{blog.author}</p>
                <span className='inline-block text-gray-500 ml-2'>
                    {'-'} {blog.comments.length}
                </span>
            </div>
            <h1 className='text-2xl text-gray-600'>{blog.title}</h1>
        </div>
    );
}
