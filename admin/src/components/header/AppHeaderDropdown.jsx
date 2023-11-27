import React, { useContext } from 'react';
import {
    CAvatar,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle
} from '@coreui/react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import avatar from './../../assets/images/avatars/generic-avatar.png';
import { AuthContext } from '../../context/auth';
import { ENV } from '../../utils/constants';
import { Link, Navigate } from 'react-router-dom';
import { isAuthorized } from '../../utils/helpers';

const AppHeaderDropdown = () => {
    const authCtx = useContext(AuthContext);

    return (
        <>
            {!isAuthorized() && <Navigate to='/' />}
            <CDropdown variant='nav-item'>
                <CDropdownToggle
                    placement='bottom-end'
                    className='py-0'
                    caret={false}
                >
                    {authCtx && authCtx.user.avatar ? (
                        <CAvatar
                            src={`${ENV.images}/${authCtx.user.avatar}`}
                            size='md'
                        />
                    ) : (
                        <CAvatar src={`${avatar}`} size='md' />
                    )}
                </CDropdownToggle>
                <CDropdownMenu className='pt-0' placement='bottom-end'>
                    <CDropdownHeader className='bg-light fw-semibold py-2'>
                        Settings
                    </CDropdownHeader>

                    <Link
                        to={`users/${authCtx.user.id}/profile`}
                        className='header-dropdown-link'
                    >
                        <CIcon icon={cilUser} className='me-2' />
                        Profile
                    </Link>

                    <CDropdownDivider />
                    <CDropdownItem
                        onClick={() => authCtx.logout()}
                        role='button'
                    >
                        <CIcon icon={cilLockLocked} className='me-2' />
                        Log out
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        </>
    );
};

export default AppHeaderDropdown;