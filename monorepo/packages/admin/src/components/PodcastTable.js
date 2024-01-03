import {
    CTable,
    CTableDataCell,
    CTableRow,
    CTableHeaderCell,
    CTableHead,
    CTableBody
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const PodcastTable = ({ podcasts }) => {
    const navigate = useNavigate();

    const clickHandler = id => {
        navigate(`/dashboard/podcasts/${id}`);
    };

    return (
        <CTable hover striped responsive='sm'>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Summary</CTableHeaderCell>
                    <CTableHeaderCell>Author</CTableHeaderCell>
                    <CTableHeaderCell>Genre</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {podcasts &&
                    podcasts.map(podcast => (
                        <CTableRow
                            role='button'
                            key={podcast.id}
                            onClick={() => clickHandler(podcast.id)}
                        >
                            <CTableDataCell>{podcast.count}</CTableDataCell>
                            <CTableDataCell>{podcast.title}</CTableDataCell>
                            <CTableDataCell>
                                {`${podcast.summary.substring(0, 15)}...`}
                            </CTableDataCell>
                            <CTableDataCell>{podcast.author}</CTableDataCell>
                            <CTableDataCell>{podcast.genre}</CTableDataCell>
                            <CTableDataCell>{podcast.status}</CTableDataCell>
                        </CTableRow>
                    ))}
            </CTableBody>
        </CTable>
    );
};

export default PodcastTable;
