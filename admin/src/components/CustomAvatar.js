import React, { memo } from 'react';

const CustomAvatar = ({ className, src, alt, style }) => {
    return (
        <img
            src={src}
            alt={alt}
            height='100%'
            width='100%'
            className={`custom-avatar ${className}`}
            style={style}
        />
    );
};

export default memo(CustomAvatar);
