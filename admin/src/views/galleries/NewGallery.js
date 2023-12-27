import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { cilStar, cilPencil, cilImage } from '@coreui/icons';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { disableButton } from '../../utils/helpers';
import { createGallery } from '../../utils/requests/general-request';

const NewGallery = () => {
    const data = useActionData();
    const navigation = useNavigation();
    // Redirect conditionally!
    useRedirect(data, '/dashboard/galleries', true);

    return (
        <CRow className='justify-content-center'>
            <CCol md={6}>
                <Alert data={data} message='Gallery created successfully.' />
                <CCard>
                    <CCardHeader>
                        <small> New Gallery Form</small>
                    </CCardHeader>
                    <CCardBody>
                        <Form
                            method='post'
                            noValidate
                            encType='multipart/form-data'
                        >
                            <CRow>
                                <Input
                                    element='input'
                                    type='text'
                                    id='title'
                                    name='title'
                                    placeholder='Title'
                                    labelTitle='Title'
                                    data={data}
                                    icon={cilStar}
                                />
                            </CRow>
                            <CRow>
                                <Input
                                    element='textarea'
                                    type='textarea'
                                    id='description'
                                    name='description'
                                    placeholder='Max 200 letters'
                                    labelTitle='Description'
                                    data={data}
                                    icon={cilPencil}
                                />
                            </CRow>
                            <CRow>
                                <Input
                                    element='input'
                                    id='images'
                                    type='file'
                                    name='images[]'
                                    labelTitle='Images'
                                    accept='.jpeg, .png, .jpg, .svg'
                                    multiple
                                    icon={cilImage}
                                    data={data}
                                />
                            </CRow>
                            <CRow>
                                <CCol>
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
    return await createGallery(request);
};

export default NewGallery;
