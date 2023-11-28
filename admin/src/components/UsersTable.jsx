import {
    CTable,
    CTableDataCell,
    CTableRow,
    CTableHeaderCell,
    CTableHead,
    CTableBody,
    CAvatar
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../store/auth';
import { ENV, ROLES } from '../utils/constants';
import avatar from '../assets/images/generic-avatar.png';
import { formatDateWithDay } from '../utils/helpers';

const UsersTable = props => {
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const clickHandler = id => {
        if (
            [ROLES.admin, ROLES.super].includes(authCtx.user.roles)
        ) {
            navigate(`/dashboard/users/${id}`);
        }
    };

    return (
        <CTable hover striped responsive='sm'>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>First Name</CTableHeaderCell>
                    <CTableHeaderCell>Last Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>
                    <CTableHeaderCell>Member Since</CTableHeaderCell>
                    <CTableHeaderCell>Avatar</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {props.users &&
                    props.users.map(user => (
                        <CTableRow
                            role='button'
                            key={user.email}
                            onClick={() => clickHandler(user.id)}
                        >
                            <CTableDataCell>{user.count}</CTableDataCell>
                            <CTableDataCell>{user.first_name}</CTableDataCell>
                            <CTableDataCell>{user.last_name}</CTableDataCell>
                            <CTableDataCell>{user.email}</CTableDataCell>
                            <CTableDataCell>{user.status}</CTableDataCell>
                            <CTableDataCell>{user.position}</CTableDataCell>
                            <CTableDataCell>
                                {formatDateWithDay(user.member_since)}
                            </CTableDataCell>
                            <CTableDataCell>
                                {
                                    <CAvatar
                                        size='md'
                                        src={
                                            user.avatar === null
                                                ? avatar
                                                : `${ENV.images}/${user.avatar}`
                                        }
                                    />
                                }
                            </CTableDataCell>
                        </CTableRow>
                    ))}
            </CTableBody>
        </CTable>
    );
};


export default UsersTable;