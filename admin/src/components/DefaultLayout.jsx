import { memo, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppSidebar, AppFooter, AppHeader } from '../components/index';
import { isAuthorized } from '../utils/helpers';

const DefaultLayout = () => {
    const [show, setShow] = useState(true);

    return (
        <>
            {!isAuthorized() && <Navigate to='/' replace={true} />}
            <AppSidebar
                onClick={() => setShow(show => !show)}
                unfoldable={show}
                sidebarShow={show}
                onVisibleChange={visible => setShow(visible)}
            />
            <div className='wrapper d-flex flex-column min-vh-100 bg-light'>
                <AppHeader toggleSidebar={() => setShow(show => !show)} />
                <div className='body flex-grow-1 px-3'>
                    <Outlet />
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default memo(DefaultLayout);