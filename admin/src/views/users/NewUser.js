import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { cilUser, cilAt } from '@coreui/icons';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { disableButton } from '../../utils/helpers';
import CustomDate from '../../utils/date';
import { createUser } from '../../utils/requests/general-request';

const NewUser = () => {
    const data = useActionData();
    const navigation = useNavigation();
    // Redirect conditionally!
    useRedirect(data, '/dashboard/users', true);

    return (
        <CRow className='justify-content-center'>
            <CCol md={6}>
                <Alert data={data} message='User created successfully.' />
                <CCard>
                    <CCardHeader>
                        <small> New User Form</small>
                    </CCardHeader>
                    <CCardBody>
                        <Form method='post' noValidate>
                            <CRow>
                                <CCol xs={12}>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='first_name'
                                        name='first_name'
                                        placeholder='First Name'
                                        labelTitle='First Name'
                                        data={data}
                                        icon={cilUser}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12}>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='last_name'
                                        name='last_name'
                                        placeholder='Last Name'
                                        labelTitle='Last Name'
                                        data={data}
                                        icon={cilUser}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12}>
                                    <Input
                                        element='input'
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Email'
                                        labelTitle='Email'
                                        data={data}
                                        icon={cilAt}
                                    />
                                    <Input
                                        element='input'
                                        type='hidden'
                                        id='client_current_time'
                                        name='client_current_time'
                                        value={new Date().getMilliseconds()}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} sm={12}>
                                    <CButton
                                        className='btn-facebook my-2'
                                        type='submit'
                                        disabled={disableButton(navigation)}
                                    >
                                        <span>
                                            {navigation.state === 'submitting'
                                                ? 'Submitting...'
                                                : 'Submit'}
                                        </span>
                                    </CButton>
                                </CCol>
                            </CRow>
                        </Form>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export const action = async ({ request }) => {
    return await createUser(request);
};

export default NewUser;
