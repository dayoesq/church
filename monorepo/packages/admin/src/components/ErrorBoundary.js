import { memo, useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import {
    CButton,
    CCol,
    CContainer,
    CRow,
    CCardGroup,
    CCardBody,
    CCard
} from '@coreui/react';
import Page404 from '../views/pages/Page404';
import { STATUS_CODE } from '../utils/constants';

const ErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            error &&
            [
                STATUS_CODE.methodNotAllowed,
                STATUS_CODE.tooManyRequests,
                STATUS_CODE.serviceUnavailable,
                STATUS_CODE.unauthorized,

            ].includes(error.status)
        ) {
            sessionStorage.removeItem('user');
            navigate('/');
        }
    }, [error, navigate]);

    if (error.status === STATUS_CODE.notFound) {
        return <Page404 />;
    }

    return (
        <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
            <CContainer>
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <CCardGroup>
                            <CCard className='p-4'>
                                <CCardBody>
                                    <div className='d-flex flex-row align-items-center'>
                                        <CContainer>
                                            <CRow className='justify-content-center'>
                                                <CCol xs={12}>
                                                    <span className='clearfix'>
                                                        <h4 className='pt-3'>
                                                            Oops, an error has
                                                            occurred!
                                                        </h4>
                                                        <p className='text-medium-emphasis float-start'>
                                                            {process.env
                                                                .NODE_ENV ===
                                                            'development'
                                                                ? error.message
                                                                : 'An error occurred. Please try again later!'}
                                                        </p>
                                                    </span>
                                                    <CButton
                                                        color='info'
                                                        href='/dashboard'
                                                        className='text-white'
                                                    >
                                                        Back to home?
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CContainer>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default memo(ErrorBoundary);
