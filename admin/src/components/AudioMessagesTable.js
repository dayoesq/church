import {
    CTable,
    CTableDataCell,
    CTableRow,
    CTableHeaderCell,
    CTableHead,
    CTableBody
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const AudioMessagesTable = props => {
    const navigate = useNavigate();

    const clickHandler = id => {
        navigate(`/dashboard/audios/${id}`);
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
                {props.audios &&
                    props.audios.map(audio => (
                        <CTableRow
                            role='button'
                            key={audio.id}
                            onClick={() => clickHandler(audio.id)}
                        >
                            <CTableDataCell>{audio.count}</CTableDataCell>
                            <CTableDataCell>{audio.title}</CTableDataCell>
                            <CTableDataCell>
                                {`${audio.summary.substring(0, 15)}...`}
                            </CTableDataCell>
                            <CTableDataCell>{audio.author}</CTableDataCell>
                            <CTableDataCell>{audio.genre}</CTableDataCell>
                            <CTableDataCell>{audio.status}</CTableDataCell>
                        </CTableRow>
                    ))}
            </CTableBody>
        </CTable>
    );
};

export default AudioMessagesTable;
