import { memo } from 'react';
import {
    CImage,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler
} from '@coreui/react';

import { AppSidebarNav } from './AppSidebarNav';
import logo from '../assets/images/rccg-logo.png';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import generalNavigation, { adminNavigation } from '../_nav';
import { isAuthorizedSuperAdmin, isAuthorizedUser } from '../utils/helpers';

const AppSidebar = ({ sidebarShow, onVisibleChange, unfoldable, onClick }) => {
    const getRoutes = () => {
        if (isAuthorizedSuperAdmin()) return adminNavigation;
        if (isAuthorizedUser()) return generalNavigation;
        return null;
    };

    return (
        <>
            <CSidebar
                position='fixed'
                unfoldable={unfoldable}
                visible={sidebarShow}
                onVisibleChange={onVisibleChange}
            >
                <CSidebarBrand className='d-none d-md-flex' to='/dashboard'>
                    <CImage
                        src={logo}
                        style={{ height: '3rem', width: '3rem' }}
                    />
                </CSidebarBrand>
                <CSidebarNav>
                    <SimpleBar>
                        <AppSidebarNav items={getRoutes()} />
                    </SimpleBar>
                </CSidebarNav>
                <CSidebarToggler
                    className='d-none d-lg-flex'
                    onClick={onClick}
                />
            </CSidebar>
        </>
    );
};

export default memo(AppSidebar);
