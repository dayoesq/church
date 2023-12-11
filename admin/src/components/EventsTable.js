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
import { ENV } from '../utils/constants';
import avatar from '../assets/images/generic-avatar.png';

const EventsTable = props => {
    const navigate = useNavigate();

    const clickHandler = id => {
        navigate(`/dashboard/events/${id}`);
    };

    return (
        <CTable hover striped responsive='sm'>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Organized By</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                    <CTableHeaderCell>End Date</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {props.events &&
                    props.events.map(event => (
                        <CTableRow
                            role='button'
                            key={event.id}
                            onClick={() => clickHandler(event.id)}
                        >
                            <CTableDataCell>{event.count}</CTableDataCell>
                            <CTableDataCell>{event.title}</CTableDataCell>
                            <CTableDataCell>{event.organizedBy}</CTableDataCell>
                            <CTableDataCell>
                                {`${event.description.substring(0, 15)}...`}
                            </CTableDataCell>
                            <CTableDataCell>{event.status}</CTableDataCell>
                            <CTableDataCell>
                                {event.images && event.images.length > 0 ? (
                                    <CAvatar
                                        size='md'
                                        src={`${ENV.images}/${event.images[0]}`}
                                    />
                                ) : (
                                    <CAvatar size='md' src={`${avatar}`} />
                                )}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
            </CTableBody>
        </CTable>
    );
};

export default EventsTable;
