import { ENV } from '../utils/constants';
import BlogPostItem from './BlogPostItem';
import { memo } from 'react';

const BlogPostList = ({ blogPosts }) => {
    return (
        <div className='d-flex gap-4 flex-wrap'>
            {blogPosts &&
                blogPosts.length &&
                blogPosts.map(blogPost => (
                    <BlogPostItem
                        key={blogPost.id}
                        blogPost={{
                            title: blogPost.title,
                            id: blogPost.id,
                            images: blogPost.images,
                            content: blogPost.content,
                            coverImage: `${
                                blogPost.images.length
                                    ? `${ENV.images}/${blogPost.coverImage}`
                                    : undefined
                            }`
                        }}
                    />
                ))}
        </div>
    );
};

export default memo(BlogPostList);
