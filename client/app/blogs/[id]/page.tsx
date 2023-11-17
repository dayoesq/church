import { getById } from '@/util/requests/http-requests';
import { BlogPost, blogs } from '@/data/blog';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';

export default async function BlogDetailsPage({
    params
}: {
    params: { id: number };
}) {
    const { id } = params;
    const post = await getById(id);

    return (
        <>
            <Navigation />
            <div className=' text-black'>
                <h1 className='text-3xl'>{post?.title}</h1>
                <div className='h-40'>
                    <p>{post?.comments}</p>
                </div>
            </div>
            <Footer />
        </>
    );
}
