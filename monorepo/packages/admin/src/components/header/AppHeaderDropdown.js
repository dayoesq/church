import React, { useContext, useState } from 'react';
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CFormSwitch
} from '@coreui/react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import avatar from './../../assets/images/generic-avatar.png';
import { AuthContext } from '../../store/auth';
import { ENV } from '../../utils/constants';
import { Link } from 'react-router-dom';

const AppHeaderDropdown = () => {
    const [checked, setChecked] = useState(false);
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
                                src={`${ENV.images}/${user.avatar}`}
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
                            <CIcon icon={cilLockLocked} className='me-2 m-0' />
                            Log out
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownHeader className='bg-light fw-semibold py-2'>
                            Maintenance Mode
                        </CDropdownHeader>
                        <CDropdownItem role='button'>
                            <div className='d-flex justify-between'>
                                <CFormSwitch
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                                <CBadge
                                    color={`${checked ? 'success' : 'danger'}`}
                                >
                                    {checked ? 'On' : 'Off'}
                                </CBadge>
                            </div>
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            )}
        </>
    );
};

export default AppHeaderDropdown;
