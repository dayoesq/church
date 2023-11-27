import { memo } from 'react';
import {
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarToggler
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

// import { logoNegative } from '../assets/brand/logo-negative';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import _adminNav from '../_nav';
import { _generalNav } from '../_nav';
import { isAdmin, isAuthorized, isSuper, isUser } from '../utils/helpers';
import { Navigate } from 'react-router-dom';
import { cilStar } from '@coreui/icons';

const AppSidebar = ({ sidebarShow, onVisibleChange, unfoldable, onClick }) => {
    const getRoutes = () => {
        if (isAuthorized() && (isAdmin() || isSuper())) return _adminNav;
        if (isAuthorized() && isUser()) return _generalNav;
    };

    return (
        <>
            {!isAuthorized() && <Navigate to='/' replace={true} />}
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
