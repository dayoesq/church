import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import {
    CContainer,
    CHeader,
    CHeaderDivider,
    CHeaderNav,
    CHeaderToggler,
    CNavItem
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';

const AppHeader = ({ toggleSidebar }) => {
    return (
        <>
            <CHeader position='sticky' className='mb-4'>
                <CContainer fluid>
                    <CHeaderToggler className='ps-1' onClick={toggleSidebar}>
                        <CIcon icon={cilMenu} size='lg' />
                    </CHeaderToggler>

                    <CHeaderNav className='d-none d-md-flex me-auto'>
                        <CNavItem>
                            <NavLink to='/dashboard' className='mx-1'>
                                Dashboard
                            </NavLink>
                        </CNavItem>
                        <CNavItem>
                            <NavLink to='/dashboard/users' className='mx-1'>
                                Users
                            </NavLink>
                        </CNavItem>
                    </CHeaderNav>
                    <CHeaderNav className='ms-3'>
                        <AppHeaderDropdown />
                    </CHeaderNav>
                </CContainer>
                <CHeaderDivider />
                <CContainer fluid>
                    <AppBreadcrumb />
                </CContainer>
            </CHeader>
        </>
    );
};

export default memo(AppHeader);
