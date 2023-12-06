import { memo } from 'react';
import {
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { Navigate } from 'react-router-dom';

import { AppSidebarNav } from './AppSidebarNav';

// import { logoNegative } from '../assets/brand/logo-negative';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import { generalNavigation, adminNavigation } from '../_nav';
import { cilStar } from '@coreui/icons';
import {isAuthorized, isAuthorizedSuperAdmin} from '../utils/helpers';

const AppSidebar = ({ sidebarShow, onVisibleChange, unfoldable, onClick }) => {
    const getRoutes = () => {
        if(isAuthorizedSuperAdmin()) return adminNavigation;
        //if(isAuthorized()) return adminNavigation;
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
                    <CIcon
                        className='sidebar-brand-full'
                        icon={cilStar}
                        height={35}
                    />
                    <CIcon
                        className='sidebar-brand-narrow'
                        icon={cilStar}
                        height={35}
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
