'use client';
import { useEffect, useState } from 'react';

import { blogs, BlogPost } from '@/data/blog';
import Blog from '@/components/Blog';
import Pagination from '@/components/Pagination';
import PrimaryHeaders from '@/components/PrimaryHeaders';

export default function BlogsPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        if (posts.length === 0) {
            setPosts(blogs);
        }
    }, [posts]);

    return (
        <>
            <div className='text-center mt-20'>
                <PrimaryHeaders title='Blog' subTitle='All posts' />
            </div>
            <div className='flex justify-center items-center md:gap-4 py-8 flex-wrap gap-y-4 m-auto px-4'>
                {posts.map(blog => (
                    <Blog
                        id={blog.id}
                        key={blog.title}
                        author={blog.author}
                        title={blog.title}
                        postedOn={blog.postedOn}
                        imageUrl={blog.imageUrl}
                        comments={blog.comments}
                    />
                ))}
            </div>
            <Pagination className='w-[30rem] m-auto' />
        </>
    );
}
