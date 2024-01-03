import { Link, Form, useActionData, useNavigation } from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CRow
} from '@coreui/react';
import { cilAt } from '@coreui/icons';

import Input from '../../../components/Input';
import { useRedirect } from '../../../hooks/redirect';
import { disableButton } from '../../../utils/helpers';
import Alert from '../../../components/Alert';
import { memo } from 'react';
import { passwordResetRequest } from '../../../utils/requests/general-request';

const PasswordResetRequest = () => {
    const data = useActionData();
    const navigation = useNavigation();

    useRedirect(data, '/', true);

    return (
        <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
            <CContainer>
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <Alert
                            data={data}
                            message='Request made successfully. A new reset link has been sent to your email!'
                        />
                        <CCardGroup>
                            <CCard className='p-4'>
                                <CCardBody>
                                    <Form method='post' noValidate>
                                        <h1 className='text-center'>
                                            Password Reset Request
                                        </h1>
                                        <p className='text-medium-emphasis text-center'>
                                            Forgot your password? We've all been
                                            there.
                                        </p>
                                        <CRow>
                                            <CCol xs={12}>
                                                <Input
                                                    element='input'
                                                    type='email'
                                                    id='email'
                                                    name='email'
                                                    placeholder='Email'
                                                    data={data}
                                                    icon={cilAt}
                                                />
                                                <Input
                                                    element='input'
                                                    type='hidden'
                                                    id='expiry_date'
                                                    name='expiry_date'
                                                    value={new Date().getMilliseconds()}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow className='my-2 d-flex align-items-center'>
                                            <CCol xs={6} md={6} lg={6} xl={6}>
                                                <CButton
                                                    color='primary'
                                                    type='submit'
                                                    disabled={disableButton(
                                                        navigation,
                                                        data
                                                    )}
                                                >
                                                    {navigation.state ===
                                                    'submitting'
                                                        ? 'Sumitting...'
                                                        : 'Submit'}
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} md={6} lg={6} xl={6}>
                                                <div
                                                    style={{
                                                        width: 'max-content',
                                                        float: 'right'
                                                    }}
                                                >
                                                    <Link to='/'>Login?</Link>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </Form>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export const action = async ({ request }) => {
    return await passwordResetRequest(request);
};

export default memo(PasswordResetRequest);
