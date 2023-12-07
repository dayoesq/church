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
import {
    cilUser,
    cilAt,
    cilPhone,
    cilFile,
    cilGlobeAlt,
    cilCode,
    cilAddressBook,
    cilBadge,
    cilUserX
} from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import {loadUser, updateUserByAdmin} from '../../utils/requests/general-request';
import { AuthContext } from '../../store/auth';
import { ROLES } from '../../utils/constants';

const User = () => {
    const [disabled, setDisabled] = useState(true);
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/users', true);

    const disableInputField = () => {
        setDisabled(disabled => !disabled);
    };

    return (
        <CRow className='justify-content-center'>
            {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                <CCol md={8}>
                    <Alert
                        data={actionData}
                        message='User updated successfully.'
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
                            <Form method='patch' noValidate>
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
                                            defaultValue={loadedData.data.firstName}
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
                                            defaultValue={loadedData.data.lastName}
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <Input
                                        element='input'
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='User email'
                                        labelTitle='Email'
                                        icon={cilAt}
                                        defaultValue={loadedData.data.email}
                                        data={actionData}
                                        disabled
                                    />
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
                                            defaultValue={loadedData.data.address}
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
                                            defaultValue={loadedData.data.postalCode}
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
                                            icon={cilCode}
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
                                                loadedData.data.countryOfResidence
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
                                            element='select'
                                            id='gender'
                                            name='gender'
                                            placeholder='Gender'
                                            labelTitle='Gender'
                                            icon={cilUserX}
                                            data={actionData}
                                            defaultValue={loadedData.data.gender}
                                            disabled={disabled}
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
                                            element='select'
                                            id='status'
                                            name='status'
                                            labelTitle='Status'
                                            icon={cilFile}
                                            data={actionData}
                                            defaultValue={loadedData.data.status}
                                            disabled={disabled}
                                        >
                                            <option value={null}>
                                                Select Status
                                            </option>
                                            <option value='pending'>
                                                Pending
                                            </option>
                                            <option value='active'>
                                                Active
                                            </option>

                                            <option value='banned'>
                                                Banned
                                            </option>
                                            <option value='suspended'>
                                                Suspended
                                            </option>
                                        </Input>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='telephone'
                                        name='telephone'
                                        placeholder='Telephone. E.g +44123456789'
                                        labelTitle='Telephone'
                                        icon={cilPhone}
                                        data={actionData}
                                        defaultValue={loadedData.data.telephone}
                                        disabled={disabled}
                                    />

                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='roles'
                                            name='roles'
                                            labelTitle='Role'
                                            icon={cilBadge}
                                            data={actionData}
                                            defaultValue={loadedData.data.roles}
                                            disabled={disabled}
                                        >
                                            <option value={null}>
                                                Select Role
                                            </option>
                                            <option value='user'>User</option>
                                            <option value='admin'>Admin</option>
                                            <option value='super'>Super</option>
                                        </Input>
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='date'
                                            id='member_since'
                                            name='member_since'
                                            placeholder='Date Joined'
                                            labelTitle='Date Joined'
                                            icon={cilBadge}
                                            data={actionData}
                                            defaultValue={loadedData.data.memberSince}
                                            disabled={disabled}
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
    return await updateUserByAdmin(request, params);
};

export const loader = async ({ request, params }) => {
    return await loadUser(request, params);
};

export default memo(User);
