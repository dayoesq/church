import { CCard, CCardHeader, CCardBody } from '@coreui/react';
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
        <CCard onClick={() => clickHandler(gallery.id)}>
            <CCardHeader>
                <small>{gallery.title}</small>
            </CCardHeader>
            <CCardBody>
                <img
                    src={gallery.url}
                    alt={gallery.title}
                    width='100%'
                    height='100%'
                />
            </CCardBody>
        </CCard>
    );
};

export default memo(GalleryItem);
