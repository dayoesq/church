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
    useNavigate,
    useParams
} from 'react-router-dom';
import { cilUser, cilFile, cilPencil, cilImage, cilTrash } from '@coreui/icons';
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
import { ENV, POST_STATUS, ROLES } from '../../utils/constants';
import WarningModal from '../../components/modals/WarningModal';
import CIcon from '@coreui/icons-react';
import CustomAvatar from '../../components/CustomAvatar';

import avatar from '../../assets/images/generic-avatar.png';

export const postStatus = [
    { name: 'Select Status', value: undefined },
    { name: 'Draft', value: POST_STATUS.draft },
    { name: 'Archived', value: POST_STATUS.archived },
    { name: 'Published', value: POST_STATUS.published }
];

const Testimonial = () => {
    const [disabled, setDisabled] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [deleteOptions, setDeleteOptions] = useState('');
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const { id } = useParams();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/testimonials', true);

    const disableInputField = () => {
        setDisabled(disabled => !disabled);
    };

    const handleDeleteOptions = () => {
        setDeleteOptions('image');
        setShowModal(true);
    };

    const deleteImageHandler = async () => {
        const uri =
            deleteOptions === 'image'
                ? `${ENV.baseUrl}/images/testimonials/${id}/delete`
                : `${ENV.baseUrl}/testimonials/${id}`;
        const isDeleted = await deleteHandler(uri);
        if (isDeleted) {
            setShowModal(false);
            navigate('/dashboard/testimonials');
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

            <CRow className='justify-content-center'>
                {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                    <>
                        <CCol md={8}>
                            {loadedData && loadedData.data.images.length > 0 ? (
                                <div className='image-wrapper mb-4'>
                                    <CustomAvatar
                                        src={`${ENV.images}/${loadedData.data.images[0].url}`}
                                        alt='User Avatar'
                                    />

                                    <CButton
                                        className='btn btn-danger avatar-image-button'
                                        type='button'
                                        onClick={handleDeleteOptions}
                                    >
                                        <CIcon icon={cilTrash} />
                                    </CButton>
                                </div>
                            ) : (
                                <div className='image-wrapper mb-4'>
                                    <CustomAvatar
                                        src={avatar}
                                        alt='User Avatar'
                                    />
                                </div>
                            )}
                            <Alert
                                data={actionData}
                                message='Testimonial updated successfully.'
                            />
                            <CCard className='mb-4'>
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
                                        </CRow>
                                        <CRow>
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
                                        </CRow>
                                        <CRow>
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
                                                {postStatus.map(status => (
                                                    <option
                                                        value={status.value}
                                                        key={status.name}
                                                    >
                                                        {status.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </CRow>
                                        <CRow>
                                            <Input
                                                element='textarea'
                                                id='content'
                                                name='content'
                                                labelTitle='Content'
                                                icon={cilPencil}
                                                data={actionData}
                                                defaultValue={
                                                    loadedData.data.content
                                                }
                                                disabled={disabled}
                                            />
                                        </CRow>
                                        <CRow>
                                            <Input
                                                element='input'
                                                id='images'
                                                type='file'
                                                name='images'
                                                labelTitle='Avatar'
                                                accept='.jpeg, .png, .jpg, .svg'
                                                icon={cilImage}
                                                data={actionData}
                                                disabled={disabled}
                                            />
                                        </CRow>
                                        {/* Hidden input to allow for update when file is involved */}
                                        <input
                                            id='_method'
                                            type='hidden'
                                            name='_method'
                                            value='PATCH'
                                        />

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
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                            >
                                                <span>Delete</span>
                                            </CButton>
                                        </div>
                                    </Form>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </>
                )}
            </CRow>
        </>
    );
};

export const action = async ({ request, params }) => {
    const uri = `${ENV.baseUrl}/testimonials/${params.id}`;
    return await handleActions(request, { uri, isFormData: true });
};

export const loader = async ({ request, params }) => {
    const uri = `${ENV.baseUrl}/testimonials/${params.id}`;
    return await loadResource(request, { uri });
};

export default memo(Testimonial);
