import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CAvatar
} from '@coreui/react';
import {
    Form,
    useNavigation,
    useLoaderData,
    useActionData,
    
} from 'react-router-dom';
import {
    cilUser,
    cilAt,
    cilPhone,
    cilGlobeAlt,
    cilCode,
    cilAddressBook,
    cilUserX,
    cilImage,
    cilBank
} from '@coreui/icons';
import { memo, useState } from 'react';
import avatar from '../assets/images/avatars/generic-avatar.png';
import { useRedirect } from '../hooks/redirect';
import Alert from '../components/Alert';
import Input from '../components/Input';
import { ENV } from '../utils/constants';
import { updateSelf } from '../utils/requests/general-request';

const Profile = () => {
    const [disabled, setDisabled] = useState(true);
    const data = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();
    // Redirect to users!
    useRedirect(actionData, '/dashboard/users', true);

    const disableInputField = () => {
        setDisabled(disabled => !disabled);
    };

    return (
        <>
            <CRow className='justify-content-center position-relative'>
                <CAvatar
                    style={{ width: '8rem', height: '8rem' }}
                    src={
                        data.data.user.avatar === null
                            ? avatar
                            : `${ENV.images}/${data.data.user.avatar}`
                    }
                />
            </CRow>
            <CRow className='justify-content-center'>
                <CCol md={8}>
                    <Alert
                        data={actionData}
                        message='Profile updated successfully.'
                    />
                    <CCard>
                        <CCardHeader className='d-flex justify-content-space-between'>
                            <small>
                                {' '}
                                {`${data.data.user.first_name} ${data.data.user.last_name}`}
                            </small>
                            <CButton
                                className='btn btn-success text-white'
                                style={{ marginLeft: 'auto' }}
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
                                                data.data.user.first_name
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
                                                data.data.user.last_name
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='email'
                                            id='email'
                                            name='email'
                                            placeholder='User email'
                                            labelTitle='Email'
                                            icon={cilAt}
                                            defaultValue={data.data.user.email}
                                            data={actionData}
                                            disabled
                                        />
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='address'
                                            name='address'
                                            placeholder='Address'
                                            labelTitle='Address'
                                            icon={cilAddressBook}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user.address
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='postal_code'
                                            name='postal_code'
                                            placeholder='Postal Code'
                                            labelTitle='Postal Code'
                                            icon={cilCode}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user.postal_code
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='country_of_residence'
                                            name='country_of_residence'
                                            placeholder='Country of Residence'
                                            labelTitle='Country of Residence'
                                            icon={cilGlobeAlt}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user
                                                    .country_of_residence
                                            }
                                            disabled={disabled}
                                        >
                                            <option value={null}>
                                                Select Country
                                            </option>
                                            <option value='Nigeria'>
                                                Nigeria
                                            </option>
                                            <option value='Ireland'>
                                                Ireland
                                            </option>
                                            <option value='Finland'>
                                                Finland
                                            </option>
                                            <option value='United Kingdom'>
                                                United Kingdom
                                            </option>
                                            <option value='United States'>
                                                United States
                                            </option>
                                        </Input>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='nationality'
                                            name='nationality'
                                            placeholder='Nationality'
                                            labelTitle='Nationality'
                                            icon={cilGlobeAlt}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user.nationality
                                            }
                                            disabled={disabled}
                                        >
                                            <option value={null}>
                                                Select Country
                                            </option>
                                            <option value='Nigeria'>
                                                Nigeria
                                            </option>
                                            <option value='Ireland'>
                                                Ireland
                                            </option>
                                            <option value='Finland'>
                                                Finland
                                            </option>
                                            <option value='United Kingdom'>
                                                United Kingdom
                                            </option>
                                            <option value='United States'>
                                                United States
                                            </option>
                                        </Input>
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='telephone'
                                            name='telephone'
                                            placeholder='Telephone. E.g +44123456789'
                                            labelTitle='Telephone'
                                            icon={cilPhone}
                                            data={data}
                                            defaultValue={
                                                data.data.user.telephone
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='gender'
                                            name='gender'
                                            placeholder='Gender'
                                            labelTitle='Gender'
                                            icon={cilUserX}
                                            data={actionData}
                                            defaultValue={data.data.user.gender}
                                            disabled
                                        >
                                            <option value={null}>
                                                Select Gender
                                            </option>
                                            <option value='male'>Male</option>
                                            <option value='female'>
                                                Female
                                            </option>
                                        </Input>
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            id='avatar'
                                            type='file'
                                            name='avatar'
                                            labelTitle='Avatar'
                                            accept='.jpeg, .png, .jpg, .svg'
                                            icon={cilImage}
                                            data={actionData}
                                            disabled={disabled}
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
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='bank_account_number'
                                            name='bank_account_number'
                                            placeholder='Account Number'
                                            labelTitle='Account Number'
                                            icon={cilBank}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user
                                                    .bank_account_number
                                            }
                                            disabled
                                        />
                                    </CCol>
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
                                                    ? 'Sumitting...'
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
        </>
    );
};

export const action = async ({ request, params }) => {
    return await updateSelf(request, params);
};

export default memo(Profile);