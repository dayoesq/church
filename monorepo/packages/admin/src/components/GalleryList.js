import { ENV } from '../utils/constants';
import GalleryItem from './GalleryItem';
import { memo } from 'react';

const GalleryList = ({ galleries }) => {
    return (
        <div className='d-flex gap-4 flex-wrap'>
            {galleries &&
                galleries.length &&
                galleries.map(gallery => (
                    <GalleryItem
                        key={gallery.id}
                        gallery={{
                            title: gallery.title,
                            id: gallery.id,
                            images: gallery.images,
                            description: gallery.description,
                            url: `${
                                gallery.images.length
                                    ? `${ENV.images}/${gallery.images[0].url}`
                                    : undefined
                            }`
                        }}
                    />
                ))}
        </div>
    );
};

export default memo(GalleryList);
