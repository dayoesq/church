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
    useActionData
} from 'react-router-dom';
import {
    cilUser,
    cilPhone,
    cilGlobeAlt,
    cilCode,
    cilAddressBook,
    cilUserX,
    cilImage,
    cilHome
} from '@coreui/icons';
import { memo, useState } from 'react';
import avatar from '../../assets/images/generic-avatar.png';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { ENV } from '../../utils/constants';
import { updateSelf } from '../../utils/requests/general-request';

const Profile = () => {
    const [disabled, setDisabled] = useState(true);
    const loadedData = useLoaderData();
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
                        loadedData.data.avatar === null
                            ? avatar
                            : `${ENV.images}/${loadedData.data.avatar}`
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
                                {`${loadedData.data.firstName} ${loadedData.data.lastName}`}
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
                                    <CCol xs={12} md={4} lg={4} xl={4}>
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
                                                loadedData.data.address
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={4} lg={4} xl={4}>
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
                                                loadedData.data.postalCode
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={4} lg={4} xl={4}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='city'
                                            name='city'
                                            placeholder='City'
                                            labelTitle='City'
                                            icon={cilHome}
                                            data={actionData}
                                            defaultValue={loadedData.data.city}
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
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
                                                loadedData.data
                                                    .countryOfResidence
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
                                            element='select'
                                            id='country_of_origin'
                                            name='country_of_origin'
                                            placeholder='Country of Origin'
                                            labelTitle='Country of Origin'
                                            icon={cilGlobeAlt}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.countryOfOrigin
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
                                            element='input'
                                            type='text'
                                            id='telephone'
                                            name='telephone'
                                            placeholder='Telephone. E.g +44123456789'
                                            labelTitle='Telephone'
                                            icon={cilPhone}
                                            data={loadedData}
                                            defaultValue={
                                                loadedData.data.telephone
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='gender'
                                            name='gender'
                                            placeholder='Gender'
                                            labelTitle='Gender'
                                            icon={cilUserX}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.gender
                                            }
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
                                </CRow>
                                <CRow>
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
                                </CRow>
                                {/* Hidden input to allow for update when file is involved */}
                                <input
                                    element='input'
                                    id='_method'
                                    type='hidden'
                                    name='_method'
                                    value='PATCH'
                                />
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
            </CRow>
        </>
    );
};

export const action = async ({ request, params }) => {
    return await updateSelf(request, params);
};

export default memo(Profile);
