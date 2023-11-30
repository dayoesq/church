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

import avatar from './../../assets/images/generic-avatar.png';
import { AuthContext } from '../../store/auth';
import { ENV } from '../../utils/constants';
import { Link } from 'react-router-dom';

const AppHeaderDropdown = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            {user && (
                <CDropdown variant='nav-item'>
                    <CDropdownToggle
                        placement='bottom-end'
                        className='py-0'
                        caret={false}
                    >
                        {user.avatar ? (
                            <CAvatar
                                src={`${ENV.images}/${user.photo}`}
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
                            to={`users/${user.id}/profile`}
                            className='header-dropdown-link'
                        >
                            <CIcon icon={cilUser} className='me-2' />
                            Profile
                        </Link>

                        <CDropdownDivider />
                        <CDropdownItem onClick={() => logout()} role='button'>
                            <CIcon icon={cilLockLocked} className='me-2' />
                            Log out
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            )}
        </>
    );
};

export default AppHeaderDropdown;
