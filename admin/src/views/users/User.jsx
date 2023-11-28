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
    useActionData,
    
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
    cilUserX,
    cilBank
} from '@coreui/icons';
import { memo, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { isAdmin, isSuper } from '../../utils/helpers';
import { useRedirect } from '../../hooks/redirect';
import { loadUser, updateUser } from '../../utils/requests/general-request';

const User = () => {
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
        <CRow className='justify-content-center'>
            {isAdmin() || isSuper() ? (
                <CCol md={8}>
                    <Alert
                        data={actionData}
                        message='User updated successfully.'
                    />
                    <CCard>
                        <CCardHeader className='d-flex'>
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
                                            element='select'
                                            id='gender'
                                            name='gender'
                                            placeholder='Gender'
                                            labelTitle='Gender'
                                            icon={cilUserX}
                                            data={actionData}
                                            defaultValue={data.data.user.gender}
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
                                            data={actionData}
                                            defaultValue={
                                                data.data.user.telephone
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='status'
                                            name='status'
                                            labelTitle='Status'
                                            icon={cilFile}
                                            data={actionData}
                                            defaultValue={data.data.user.status}
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
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='select'
                                            id='role'
                                            name='role'
                                            labelTitle='Role'
                                            icon={cilBadge}
                                            data={actionData}
                                            defaultValue={data.data.user.role}
                                            disabled={disabled}
                                        >
                                            <option value={null}>
                                                Select Role
                                            </option>
                                            <option value='user'>User</option>
                                            <option value='admin'>Admin</option>
                                            <option
                                                value='super'
                                                disabled={!isSuper()}
                                            >
                                                Super
                                            </option>
                                        </Input>
                                    </CCol>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='position'
                                            name='position'
                                            placeholder='Position'
                                            labelTitle='Position'
                                            icon={cilBadge}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user.position
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} md={6} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='date'
                                            id='joined_on'
                                            name='joined_on'
                                            placeholder='Date Joined'
                                            labelTitle='Date Joined'
                                            icon={cilBadge}
                                            data={actionData}
                                            defaultValue={
                                                data.data.user.joined_on
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
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
            ) : (
                <CCol md={8}>
                    <Alert
                        data={actionData}
                        message='User updated successfully.'
                    />
                    <CCard>
                        <CCardHeader className='d-flex justify-content-space-between'>
                            <small> User Details</small>
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
            )}
        </CRow>
    );
};

export const action = async ({ request, params }) => {
    return await updateUser(request, params);
};

export const loader = async ({ request, params }) => {
    return await loadUser(request, params);
};

export default memo(User);