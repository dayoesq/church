import {
    CTable,
    CTableDataCell,
    CTableRow,
    CTableHeaderCell,
    CTableHead,
    CTableBody
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { memo, useContext } from 'react';
import { AuthContext } from '../store/auth';
import { ROLES } from '../utils/constants';

const ProjectsTable = ({ projects }) => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const clickHandler = id => {
        if ([ROLES.admin, ROLES.super].includes(user.roles)) {
            navigate(`/dashboard/projects/${id}`);
        }
    };

    return (
        <CTable hover striped responsive='sm'>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {projects &&
                    projects.map(project => (
                        <CTableRow
                            role='button'
                            key={project.id}
                            onClick={() => clickHandler(project.id)}
                        >
                            <CTableDataCell>{project.count}</CTableDataCell>
                            <CTableDataCell>{project.title}</CTableDataCell>
                            <CTableDataCell>
                                {`${project.description.substring(0, 20)}...`}
                            </CTableDataCell>
                            <CTableDataCell>{project.status}</CTableDataCell>
                        </CTableRow>
                    ))}
            </CTableBody>
        </CTable>
    );
};

export default memo(ProjectsTable);
