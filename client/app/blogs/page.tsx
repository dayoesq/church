'use client';
import { useEffect, useState } from 'react';

import { blogs, BlogPost } from '@/data/blog';
import Blog from '@/components/Blog';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Pagination from '@/components/Pagination';

export default function Page() {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        if (posts.length === 0) {
            setPosts(blogs);
        }
    }, [posts]);

    return (
        <>
            <Navigation />
            <>
                <h1 className='text-center text-5xl uppercase my-20'>
                    Our Blog Posts
                </h1>
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
            <Footer />
        </>
    );
}
