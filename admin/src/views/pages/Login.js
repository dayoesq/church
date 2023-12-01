import React, { memo, useContext, useEffect } from 'react';
import {
    Link,
    Form,
    useNavigation,
    useActionData,
    useNavigate,
    Navigate
} from 'react-router-dom';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CRow
} from '@coreui/react';
import { cilLockLocked, cilAt } from '@coreui/icons';
import { AuthContext } from '../../store/auth';
import { disableButton, isAuthorized } from '../../utils/helpers';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { login } from '../../utils/requests/general-request';

const Login = () => {
    const data = useActionData();
    const { login } = useContext(AuthContext);
    const navigation = useNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data && data.statusCode === 200) {
            const user = {
                id: data.data.id,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                avatar: data.data.avatar,
                roles: data.data.roles,
                status: data.data.status
            };

            login(user, data.token);
            navigate('/dashboard');
        }
    }, [data, login, navigate]);

    return (
        <>
            {isAuthorized() && <Navigate to='/dashboard' replace={true} />}
            <div className='bg-light min-vh-100 d-flex flex-row align-items-center'>
                <CContainer>
                    <CRow className='justify-content-center'>
                        <CCol md={6}>
                            <Alert data={data} message={undefined} />
                            <CCardGroup>
                                <CCard className='p-4'>
                                    <CCardBody>
                                        <Form method='post' noValidate>
                                            <h1 className='text-center'>
                                                Login
                                            </h1>
                                            <p className='text-medium-emphasis text-center'>
                                                Sign in to your account
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
                                                </CCol>
                                            </CRow>
                                            <CRow>
                                                <CCol xs={12}>
                                                    <Input
                                                        element='input'
                                                        type='password'
                                                        id='password'
                                                        name='password'
                                                        placeholder='Password'
                                                        data={data}
                                                        icon={cilLockLocked}
                                                    />
                                                </CCol>
                                            </CRow>

                                            <CRow className='my-2'>
                                                <CCol xs={6} md={6} lg={6}>
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
                                                            ? 'Logging in...'
                                                            : 'Login'}
                                                    </CButton>
                                                </CCol>
                                                <CCol xs={6} md={6} lg={6}>
                                                    <div
                                                        style={{
                                                            width: 'max-content',
                                                            float: 'right'
                                                        }}
                                                    >
                                                        <Link to='/password-reset-request'>
                                                            Forgot password?
                                                        </Link>
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
        </>
    );
};

export const action = async ({ request }) => {
    return await login(request);
};

export default memo(Login);
