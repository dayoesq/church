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

const TestimonialsTable = props => {
    const navigate = useNavigate();

    const clickHandler = (id) => {
        navigate(`/dashboard/testimonials/${id}`);
    };

    return (
        <CTable hover striped responsive='sm'>
            <CTableHead>
                <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>First Name</CTableHeaderCell>
                    <CTableHeaderCell>Last Name</CTableHeaderCell>
                    <CTableHeaderCell>Content</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Avatar</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {props.testimonials &&
                    props.testimonials.map(testimonial => (
                        <CTableRow
                            role='button'
                            key={testimonial.id}
                            onClick={() => clickHandler(testimonial.id)}
                        >
                            <CTableDataCell>{testimonial.count}</CTableDataCell>
                            <CTableDataCell>
                                {testimonial.firstName}
                            </CTableDataCell>
                            <CTableDataCell>
                                {testimonial.lastName}
                            </CTableDataCell>
                            <CTableDataCell>
                                {`${testimonial.content.substring(0, 15)}...`}
                            </CTableDataCell>
                            <CTableDataCell>
                                {testimonial.status}
                            </CTableDataCell>
                            <CTableDataCell>
                                {testimonial.avatar ? (
                                    <CAvatar
                                        size='md'
                                        src={`${ENV.images}/${testimonial.avatar}`}
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

export default TestimonialsTable;
