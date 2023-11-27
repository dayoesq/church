import React from 'react';
import { CRow, CCol, CWidgetStatsA } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowBottom, cilArrowTop } from '@coreui/icons';

const WidgetsDropdown = props => {
    return (
        <CRow>
            {props.users && props.users.length && (
                <CCol sm={6} lg={3}>
                    <CWidgetStatsA
                        className='mb-4 pb-4'
                        color='primary'
                        value={<>{props.users.length} </>}
                        title='Users'
                    />
                </CCol>
            )}
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className='mb-4 pb-4'
                    color='info'
                    value={
                        <>
                            {`€${props.totalDues}`}{' '}
                            {/* <span className='fs-6 fw-normal'>
                                (40.9% <CIcon icon={cilArrowTop} />)
                            </span> */}
                        </>
                    }
                    title='Dues'
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className='mb-4 pb-4'
                    color='warning'
                    value={
                        <>
                            Test{' '}
                            <span className='fs-6 fw-normal'>
                                (84.7% <CIcon icon={cilArrowTop} />)
                            </span>
                        </>
                    }
                    title='Income'
                />
            </CCol>
            <CCol sm={6} lg={3}>
                <CWidgetStatsA
                    className='mb-4 pb-4'
                    color='danger'
                    value={
                        <>
                            Test{' '}
                            <span className='fs-6 fw-normal'>
                                (-23.6% <CIcon icon={cilArrowBottom} />)
                            </span>
                        </>
                    }
                    title='Sessions'
                />
            </CCol>
        </CRow>
    );
};

export default WidgetsDropdown;