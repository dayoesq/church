import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react';
import {
    Form,
    useNavigation,
    useLoaderData,
    useActionData
} from 'react-router-dom';
import { cilUser, cilFile, cilPencil, cilImage } from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import {
    loadTestimonial,
    updateTestimonial
} from '../../utils/requests/general-request';
import { AuthContext } from '../../store/auth';
import { ROLES } from '../../utils/constants';

const Testimonial = () => {
    const [disabled, setDisabled] = useState(true);
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/testimonials', true);

    const disableInputField = () => {
        setDisabled(disabled => !disabled);
    };

    return (
        <CRow className='justify-content-center'>
            {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                <CCol md={8}>
                    <Alert
                        data={actionData}
                        message='Testimonial updated successfully.'
                    />
                    <CCard>
                        <CCardHeader className='d-flex justify-content-between'>
                            <small> User Details</small>

                            <CButton
                                className='btn btn-success text-white'
                                type='button'
                                onClick={disableInputField}
                            >
                                Edit
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <Form
                                method='post'
                                noValidate
                                encType='multipart/form-data'
                            >
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='first_name'
                                            name='first_name'
                                            placeholder='First Name'
                                            labelTitle='First Name'
                                            icon={cilUser}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.firstName
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='last_name'
                                            name='last_name'
                                            placeholder='Last Name'
                                            labelTitle='Last Name'
                                            icon={cilUser}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.lastName
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>

                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='status'
                                            name='status'
                                            labelTitle='Status'
                                            icon={cilFile}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.status
                                            }
                                            disabled={disabled}
                                        >
                                            <option value={null}>
                                                Select Status
                                            </option>
                                            <option value='archived'>
                                                Archived
                                            </option>
                                            <option value='draft'>Draft</option>

                                            <option value='published'>
                                                Published
                                            </option>
                                        </Input>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <Input
                                        element='textarea'
                                        id='content'
                                        name='content'
                                        labelTitle='Content'
                                        icon={cilPencil}
                                        data={actionData}
                                        defaultValue={loadedData.data.content}
                                        disabled={disabled}
                                    />
                                </CRow>
                                <CRow>
                                    <CCol xs={12}>
                                        <Input
                                            element='input'
                                            id='avatar'
                                            type='file'
                                            name='avatar'
                                            labelTitle='Avatar'
                                            accept='.jpeg, .png, .jpg, .svg'
                                            icon={cilImage}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.avatar
                                            }
                                        />
                                    </CCol>
                                    <Input
                                        element='input'
                                        id='_method'
                                        type='hidden'
                                        name='_method'
                                        value='PATCH'
                                    />
                                </CRow>

                                <CRow className='my-2 d-flex align-items-center'>
                                    <CCol xs={6} md={6} lg={6} xl={6}>
                                        <CButton
                                            className='btn-facebook my-2'
                                            type='submit'
                                            disabled={
                                                navigation.state ===
                                                    'submitting' ||
                                                navigation.state ===
                                                    'loading' ||
                                                disabled
                                            }
                                        >
                                            <span>
                                                {navigation.state ===
                                                'submitting'
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
            )}
        </CRow>
    );
};

export const action = async ({ request, params }) => {
    return await updateTestimonial(request, params);
};

export const loader = async ({ request, params }) => {
    return await loadTestimonial(request, params);
};

export default memo(Testimonial);
