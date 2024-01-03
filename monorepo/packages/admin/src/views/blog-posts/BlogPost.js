import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CImage
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
    cilPencil,
    cilCalendar,
    cilAsterisk,
    cilContact,
    cilBadge,
    cilLocationPin,
    cilMoney,
    cilImage,
    cilTrash
} from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import { AuthContext } from '../../store/auth';
import { ENV, ROLES } from '../../utils/constants';
import {
    deleteHandler,
    handleActions,
    loadResource
} from '../../utils/requests/general-request';
import CIcon from '@coreui/icons-react';
import WarningModal from '../../components/modals/WarningModal';

const eventStatus = [
    { name: 'Select Status', value: undefined },
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'Ongoing', value: 'ongoing' },
    { name: 'Concluded', value: 'concluded' },
    { name: 'Cancelled', value: 'cancelled' },
    { name: 'Postponed', value: 'postponed' }
];

const BlogPost = () => {
    const [disabled, setDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [imageId, setImageId] = useState();
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const { id } = useParams();
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    // On success, redirect to events!
    useRedirect(actionData, '/dashboard/events', true);

    const disableInputField = () => setDisabled(disabled => !disabled);

    const handleDeleteOptions = id => {
        if (id) setImageId(id);
        setShowModal(true);
    };

    const deleteImageHandler = async () => {
        const uri =
            imageId !== undefined
                ? `${ENV.baseUrl}/events/${id}/images/${imageId}/delete`
                : `${ENV.baseUrl}/events/${id}`;
        const isDeleted = await deleteHandler(uri);
        if (isDeleted) {
            setShowModal(false);
            navigate('/dashboard/events');
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
                    onClick={deleteImageHandler}
                />
            )}
            <CRow>
                {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                    <>
                        <CCol xs={12} sm={12} md={12} lg={9} xl={9}>
                            <Alert
                                data={actionData}
                                message='Event updated successfully.'
                            />
                            <CCard className='mb-4'>
                                <CCardHeader className='d-flex justify-content-between'>
                                    <small> Event Details</small>

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
                                                    id='title'
                                                    name='title'
                                                    placeholder='Title'
                                                    labelTitle='Title'
                                                    icon={cilAsterisk}
                                                    data={actionData}
                                                    defaultValue={
                                                        loadedData.data.title
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
                                                    id='organizer'
                                                    name='organizer'
                                                    placeholder='Organizer'
                                                    labelTitle='Organizer'
                                                    data={actionData}
                                                    icon={cilContact}
                                                    defaultValue={
                                                        loadedData.data
                                                            .organizer
                                                    }
                                                    disabled={disabled}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <Input
                                                    element='textarea'
                                                    type='textarea'
                                                    id='description'
                                                    name='description'
                                                    placeholder='Max 200 letters'
                                                    labelTitle='Description'
                                                    data={actionData}
                                                    icon={cilPencil}
                                                    defaultValue={
                                                        loadedData.data
                                                            .description
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
                                                    element='input'
                                                    type='text'
                                                    id='location'
                                                    name='location'
                                                    placeholder='Location'
                                                    labelTitle='Location'
                                                    data={actionData}
                                                    icon={cilLocationPin}
                                                    defaultValue={
                                                        loadedData.data.location
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
                                                    id='images'
                                                    type='file'
                                                    name='images'
                                                    labelTitle='Images'
                                                    accept='.jpeg, .png, .jpg, .svg'
                                                    multiple
                                                    icon={cilImage}
                                                    data={actionData}
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
                                                    element='input'
                                                    type='number'
                                                    id='fee'
                                                    name='fee'
                                                    placeholder='Fee'
                                                    labelTitle='Fee (€)'
                                                    min={0}
                                                    icon={cilMoney}
                                                    data={actionData}
                                                    defaultValue={
                                                        loadedData.data.fee
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
                                                    element='select'
                                                    id='status'
                                                    name='status'
                                                    placeholder='Status'
                                                    labelTitle='Status'
                                                    icon={cilBadge}
                                                    data={actionData}
                                                    defaultValue={
                                                        loadedData.data.status
                                                    }
                                                    disabled={disabled}
                                                >
                                                    {eventStatus.map(status => (
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
                                            <CCol
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={6}
                                                xl={6}
                                            >
                                                <Input
                                                    element='input'
                                                    type='email'
                                                    id='email'
                                                    name='email'
                                                    placeholder='Email'
                                                    labelTitle='Email'
                                                    icon={cilCalendar}
                                                    data={actionData}
                                                    defaultValue={
                                                        loadedData.data.email
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
                                                    id='telephone'
                                                    name='telephone'
                                                    placeholder='Telephone'
                                                    labelTitle='Telephone'
                                                    icon={cilCalendar}
                                                    data={actionData}
                                                    defaultValue={
                                                        loadedData.data
                                                            .telephone
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
                                                    element='input'
                                                    type='datetime-local'
                                                    id='starts_at'
                                                    name='starts_at'
                                                    placeholder='Start Date'
                                                    labelTitle='Start Date'
                                                    icon={cilCalendar}
                                                    data={actionData}
                                                    defaultValue={loadedData.data.startsAt.slice(
                                                        0,
                                                        16
                                                    )}
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
                                                    type='datetime-local'
                                                    id='ends_at'
                                                    name='ends_at'
                                                    placeholder='End Date'
                                                    labelTitle='End Date'
                                                    icon={cilCalendar}
                                                    data={actionData}
                                                    defaultValue={loadedData.data.endsAt.slice(
                                                        0,
                                                        16
                                                    )}
                                                    disabled={disabled}
                                                />
                                            </CCol>
                                        </CRow>
                                        {/* Hidden input to allow for update when file is involved */}
                                        <input
                                            id='_method'
                                            type='hidden'
                                            name='_method'
                                            value='PATCH'
                                        />
                                        <CRow className='my-2 d-flex align-items-center'>
                                            <CCol>
                                                <CButton
                                                    className='btn-facebook my-2'
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
                                            </CCol>
                                        </CRow>
                                    </Form>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        {loadedData && loadedData.data.images.length > 0 && (
                            <CCol xs={12} sm={12} md={12} lg={3} xl={3}>
                                <CCard className='image-wrapper'>
                                    <CCardBody>
                                        <CImage
                                            src={`${ENV.images}/${loadedData.data.images[0].url}`}
                                            height='100%'
                                            width='100%'
                                            alt={loadedData.data.title}
                                        />
                                    </CCardBody>
                                    <CButton
                                        className='btn btn-danger image-button'
                                        type='button'
                                        onClick={() =>
                                            handleDeleteOptions(
                                                loadedData.data.images[0].id
                                            )
                                        }
                                    >
                                        <CIcon icon={cilTrash} />
                                    </CButton>
                                </CCard>
                            </CCol>
                        )}
                    </>
                )}
            </CRow>
        </>
    );
};

export const action = async ({ request, params }) => {
    return await handleActions(request, {
        uri: `${ENV.baseUrl}/blogs/${params.id}`,
        isFormData: true,
        assets: 'images'
    });
};

export const loader = async ({ request, params }) => {
    return await loadResource(request, {
        uri: `${ENV.baseUrl}/blogs/${params.id}`
    });
};

export default memo(BlogPost);
