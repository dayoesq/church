import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { cilAsterisk, cilImage } from '@coreui/icons';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { disableButton } from '../../utils/helpers';
import { handleActions } from '../../utils/requests/general-request';
import { memo } from 'react';
import { ENV } from '../../utils/constants';
import TextEditor from '../../components/TextEditor';

const NewBlogPost = () => {
    const data = useActionData();
    const navigation = useNavigation();
    // Redirect conditionally!
    useRedirect(data, '/dashboard/blog-posts', true);

    return (
        <CRow className='justify-content-center'>
            <CCol md={6}>
                <Alert data={data} message='Blog created successfully.' />
                <CCard>
                    <CCardHeader>
                        <small> New Blog Form</small>
                    </CCardHeader>
                    <CCardBody>
                        <Form
                            method='post'
                            noValidate
                            encType='multipart/form-data'
                        >
                            <CRow>
                                <CCol>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='title'
                                        name='title'
                                        placeholder='Title'
                                        labelTitle='Title'
                                        data={data}
                                        icon={cilAsterisk}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <Input
                                        element='input'
                                        type='file'
                                        id='cover_image'
                                        name='Cover Image'
                                        placeholder='Cover Image'
                                        labelTitle='Cover Image'
                                        accept='.jpeg, .png, .jpg, .svg'
                                        data={data}
                                        icon={cilImage}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol>
                                    <TextEditor />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} sm={12}>
                                    <CButton
                                        className='btn-facebook my-2'
                                        type='submit'
                                        name='intent'
                                        value='create'
                                        disabled={disableButton(
                                            navigation,
                                            data
                                        )}
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
        uri: `${ENV.baseUrl}/blogs`,
        isFormData: true
    });
};

export default memo(NewBlogPost);
