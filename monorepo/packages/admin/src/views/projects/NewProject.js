import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { cilStar, cilPencil } from '@coreui/icons';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { disableButton } from '../../utils/helpers';
import { handleActions } from '../../utils/requests/general-request';
import { memo } from 'react';
import { ENV } from '../../utils/constants';

const NewProject = () => {
    const data = useActionData();
    const navigation = useNavigation();
    // Redirect conditionally!
    useRedirect(data, '/dashboard/projects', true);

    return (
        <CRow className='justify-content-center'>
            <CCol md={6}>
                <Alert data={data} message='Project created successfully.' />
                <CCard>
                    <CCardHeader>
                        <small> New Project Form</small>
                    </CCardHeader>
                    <CCardBody>
                        <Form method='post' noValidate>
                            <CRow>
                                <CCol>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='title'
                                        name='title'
                                        placeholder='Project Title'
                                        labelTitle='Title'
                                        data={data}
                                        icon={cilStar}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <Input
                                        element='textarea'
                                        type='textarea'
                                        id='description'
                                        name='description'
                                        placeholder='Max 1000 letters'
                                        labelTitle='Description'
                                        data={data}
                                        icon={cilPencil}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <CButton
                                        className='btn-facebook my-2'
                                        type='submit'
                                        name='intent'
                                        value='create'
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
    return await handleActions(request, {
        uri: `${ENV.baseUrl}/projects`,
        isFormData: false,
        method: 'POST'
    });
};

export default memo(NewProject);
