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
    useParams,
    useNavigate
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
import {
    deleteHandler,
    handleActions,
    loadResource
} from '../../utils/requests/general-request';
import { AuthContext } from '../../store/auth';
import { ENV, GENDER, ROLES, STATUS } from '../../utils/constants';
import WarningModal from '../../components/modals/WarningModal';

const userStatus = [
    { name: 'Select Status', value: undefined },
    { name: 'Pending', value: STATUS.pending },
    { name: 'Active', value: STATUS.active },
    { name: 'Banned', value: STATUS.banned },
    { name: 'Suspended', value: STATUS.suspended }
];

const userGender = [
    { name: 'Select Gender', value: undefined },
    { name: 'Male', value: GENDER.male },
    { name: 'Female', value: GENDER.female },
    { name: 'Others', value: GENDER.others }
];

const userRoles = [
    { name: 'Select Role', value: undefined },
    { name: 'Admin', value: ROLES.admin },
    { name: 'Super', value: ROLES.super },
    { name: 'User', value: ROLES.user }
];

const User = () => {
    const [disabled, setDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const navigate = useNavigate();

    const { id } = useParams();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/users', true);

    const disableInputField = () => setDisabled(disabled => !disabled);

    const deleteUser = async () => {
        const uri = `${ENV.baseUrl}/users/${id}`;
        const isDeleted = await deleteHandler(uri);
        if (isDeleted) {
            setShowModal(false);
            navigate('/dashboard/users');
        }
    };

    return (
        <>
            {showModal && (
                <WarningModal
                    title='Delete'
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    type='button'
                    onClick={deleteUser}
                />
            )}

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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={4}
                                            xl={4}
                                        >
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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={4}
                                            xl={4}
                                        >
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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={4}
                                            xl={4}
                                        >
                                            <Input
                                                element='input'
                                                type='text'
                                                id='city'
                                                name='city'
                                                placeholder='City'
                                                labelTitle='City'
                                                icon={cilCode}
                                                data={actionData}
                                                defaultValue={
                                                    loadedData.data.city
                                                }
                                                disabled={disabled}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
                                            <Input
                                                element='select'
                                                id='country_of_origin'
                                                name='country_of_origin'
                                                placeholder='Country of Origin'
                                                labelTitle='Country of Origin'
                                                icon={cilGlobeAlt}
                                                data={actionData}
                                                defaultValue={
                                                    loadedData.data
                                                        .countryOfOrigin
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
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
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
                                                disabled={disabled}
                                            >
                                                {userGender.map(gender => (
                                                    <option
                                                        value={gender.value}
                                                        key={gender.name}
                                                    >
                                                        {gender.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </CCol>
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
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
                                                {userStatus.map(status => (
                                                    <option
                                                        value={status.value}
                                                        key={status.name}
                                                    >
                                                        {status.name}
                                                    </option>
                                                ))}
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
                                            defaultValue={
                                                loadedData.data.telephone
                                            }
                                            disabled={disabled}
                                        />
                                    </CRow>
                                    <CRow>
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
                                            <Input
                                                element='select'
                                                id='roles'
                                                name='roles'
                                                labelTitle='Role'
                                                icon={cilBadge}
                                                data={actionData}
                                                defaultValue={
                                                    loadedData.data.roles
                                                }
                                                disabled={disabled}
                                            >
                                                {userRoles.map(role => (
                                                    <option
                                                        value={role.value}
                                                        key={role.name}
                                                    >
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </CCol>
                                        <CCol
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                        >
                                            <Input
                                                element='input'
                                                type='date'
                                                id='member_since'
                                                name='member_since'
                                                placeholder='Date Joined'
                                                labelTitle='Date Joined'
                                                icon={cilBadge}
                                                data={actionData}
                                                defaultValue={
                                                    loadedData.data.memberSince
                                                        ? loadedData.data.memberSince.slice(
                                                              0,
                                                              10
                                                          )
                                                        : ''
                                                }
                                                disabled={disabled}
                                            />
                                        </CCol>
                                    </CRow>
                                    <div className='my-4 d-flex gap-4'>
                                        <CButton
                                            className='btn-facebook'
                                            type='submit'
                                            name='intent'
                                            value='edit'
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
                                        <CButton
                                            className='btn btn-danger'
                                            type='button'
                                            onClick={() => setShowModal(true)}
                                        >
                                            <span>Delete</span>
                                        </CButton>
                                    </div>
                                </Form>
                            </CCardBody>
                        </CCard>
                    </CCol>
                )}
            </CRow>
        </>
    );
};

export const action = async ({ request, params }) => {
    const uri = `${ENV.baseUrl}/users/${params.id}`;
    return await handleActions(request, { uri, isFormData: false });
};

export const loader = async ({ request, params }) => {
    const uri = `${ENV.baseUrl}/users/${params.id}`;
    return await loadResource(request, { uri });
};

export default memo(User);
