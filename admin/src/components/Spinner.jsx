import { memo } from 'react';

const Spinner = ({ asOverlay }) => {
    return (
        <div className={`${asOverlay && 'spinner__overlay'}`}>
            <div className='lds-dual-ring'></div>
        </div>
    );
};

export default memo(Spinner);