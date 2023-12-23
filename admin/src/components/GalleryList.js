import { ENV } from '../utils/constants';
import GalleryItem from './GalleryItem';
import { memo } from 'react';

const GalleryList = ({ galleries }) => {
    console.log(galleries);
    return (
        <div className='d-flex'>
            {galleries &&
                galleries.length &&
                galleries.map(gallery => (
                    <GalleryItem
                        key={gallery.id}
                        gallery={{
                            title: gallery.title,
                            id: gallery.id,
                            url: `${ENV.images}/${gallery.images[0].url}`
                        }}
                    />
                ))}
        </div>
    );
};

export default memo(GalleryList);
