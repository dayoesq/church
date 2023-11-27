import { memo } from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => {
    return (
        <CFooter className='mt-4'>
            <div>
                <a
                    href='https://starbom.org'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Starbom
                </a>
                <span className='ms-1'>
                    &copy; {new Date().getFullYear()} gracechapel.fi
                </span>
            </div>
            <div className='ms-auto'>
                <span className='me-1'>Developed by</span>
                <a
                    href='https://dayooladapo.com'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    Dayo Oladapo
                </a>
            </div>
        </CFooter>
    );
};

export default memo(AppFooter);
