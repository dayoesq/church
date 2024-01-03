import { useNavigate } from 'react-router-dom';
import { memo, useContext } from 'react';
import { AuthContext } from '../store/auth';
import { ROLES } from '../utils/constants';

const BlogPostItem = ({ blogPost }) => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const clickHandler = id => {
        if ([ROLES.admin, ROLES.super].includes(user.roles)) {
            navigate(`/dashboard/blog-posts/${id}`);
        }
    };

    return (
        <figure
            onClick={() => clickHandler(blogPost.id)}
            className='image-card-wrapper'
        >
            <img
                className='image-card-image'
                src={blogPost.coverImage}
                alt={blogPost.title}
            />
            <figcaption>{blogPost.title}</figcaption>
        </figure>
    );
};

export default memo(BlogPostItem);
