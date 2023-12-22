import {
    CTable,
    CTableDataCell,
    CTableRow,
    CTableHeaderCell,
    CTableHead,
    CTableBody
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { CustomDate } from '../utils/requests/date';

const EventsTable = ({ events }) => {
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
                    <CTableHeaderCell>Organizer</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Fee</CTableHeaderCell>
                    <CTableHeaderCell>Start Date</CTableHeaderCell>
                    <CTableHeaderCell>End Date</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {events &&
                    events.map(event => (
                        <CTableRow
                            role='button'
                            key={event.id}
                            onClick={() => clickHandler(event.id)}
                        >
                            <CTableDataCell>{event.count}</CTableDataCell>
                            <CTableDataCell>{event.title}</CTableDataCell>
                            <CTableDataCell>{event.organizer}</CTableDataCell>
                            <CTableDataCell>
                                {`${event.description.substring(0, 15)}...`}
                            </CTableDataCell>
                            <CTableDataCell>{event.status}</CTableDataCell>
                            <CTableDataCell>{event.fee}</CTableDataCell>
                            <CTableDataCell>
                                {CustomDate.formatCustomDate(event.startsAt)}
                            </CTableDataCell>
                            <CTableDataCell>
                                {CustomDate.formatCustomDate(event.endsAt)}
                            </CTableDataCell>
                        </CTableRow>
                    ))}
            </CTableBody>
        </CTable>
    );
};

export default EventsTable;
