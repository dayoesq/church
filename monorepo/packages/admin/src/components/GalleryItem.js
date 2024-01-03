import { useNavigate } from 'react-router-dom';
import { memo, useContext } from 'react';
import { AuthContext } from '../store/auth';
import { ROLES } from '../utils/constants';

const GalleryItem = ({ gallery }) => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const clickHandler = id => {
        if ([ROLES.admin, ROLES.super].includes(user.roles)) {
            navigate(`/dashboard/galleries/${id}`);
        }
    };

    return (
        <figure
            onClick={() => clickHandler(gallery.id)}
            className='image-card-wrapper'
        >
            <img
                className='image-card-image'
                src={gallery.url}
                alt={gallery.title}
            />
            <figcaption>{gallery.title}</figcaption>
        </figure>
    );
};

export default memo(GalleryItem);
