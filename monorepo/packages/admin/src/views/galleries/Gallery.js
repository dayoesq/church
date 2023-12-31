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
    cilAsterisk,
    cilBadge,
    cilImage,
    cilTrash
} from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import { AuthContext } from '../../store/auth';
import { ENV, POST_STATUS, ROLES } from '../../utils/constants';
import {
    deleteHandler,
    handleActions,
    loadResource
} from '../../utils/requests/general-request';
import CIcon from '@coreui/icons-react';
import WarningModal from '../../components/modals/WarningModal';

const galleryStatus = [
    { name: 'Select Status', value: undefined },
    { name: 'Archived', value: POST_STATUS.archived },
    { name: 'Published', value: POST_STATUS.published },
    { name: 'Draft', value: POST_STATUS.draft }
];

const Gallery = () => {
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
    useRedirect(actionData, '/dashboard/galleries', true);

    const disableInputField = () => setDisabled(disabled => !disabled);

    const handleDeleteOptions = id => {
        if (id) setImageId(id);
        setShowModal(true);
    };

    const deleteImageHandler = async () => {
        const uri = imageId
            ? `${ENV.baseUrl}/galleries/${id}/images/${imageId}/delete`
            : `${ENV.baseUrl}/galleries/${id}`;
        const isDeleted = await deleteHandler(uri);
        if (isDeleted) {
            setShowModal(false);
            navigate('/dashboard/galleries');
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
                            <Alert
                                data={actionData}
                                message='Gallery updated successfully.'
                            />
                            <CCard className='mb-4'>
                                <CCardHeader className='d-flex justify-content-between'>
                                    <small> Gallery Details</small>

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
                                        </CRow>
                                        <CRow>
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
                                                    loadedData.data.description
                                                }
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
                                                data={actionData}
                                                disabled={disabled}
                                            />
                                        </CRow>
                                        <CRow>
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
                                                {galleryStatus.map(status => (
                                                    <option
                                                        value={status.value}
                                                        key={status.name}
                                                    >
                                                        {status.name}
                                                    </option>
                                                ))}
                                            </Input>
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

            <div className='d-flex gap-4 flex-wrap justify-content-center'>
                {loadedData &&
                    loadedData.data.images.length > 0 &&
                    loadedData.data.images.map(el => (
                        <div
                            className='image-wrapper image-card-wrapper rounded'
                            key={el.id}
                        >
                            <CImage
                                className='rounded'
                                src={`${ENV.images}/${el.url}`}
                                height='100%'
                                width='100%'
                                alt={loadedData.data.title}
                            />
                            <CButton
                                className='btn btn-danger image-button'
                                type='button'
                                onClick={() => handleDeleteOptions(el.id)}
                            >
                                <CIcon icon={cilTrash} />
                            </CButton>
                        </div>
                    ))}
            </div>
        </>
    );
};

export const action = async ({ request, params }) => {
    return await handleActions(request, {
        uri: `${ENV.baseUrl}/galleries/${params.id}`,
        isFormData: true,
        assets: 'images'
    });
};

export const loader = async ({ request, params }) => {
    return await loadResource(request, {
        uri: `${ENV.baseUrl}/galleries/${params.id}`
    });
};

export default memo(Gallery);
