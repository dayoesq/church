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
    loadGallery,
    updateGallery
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
    const [deleteOptions, setDeleteOptions] = useState('');
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const { id } = useParams();
    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    // On success, redirect to events!
    useRedirect(actionData, '/dashboard/galleries', true);

    const disableInputField = () => setDisabled(disabled => !disabled);

    const handleDeleteOptions = () => {
        setDeleteOptions('image');
        setShowModal(true);
    };

    const deleteImageHandler = async () => {
        const uri =
            deleteOptions === 'image'
                ? `${ENV.baseUrl}/images/galleries/${id}/delete`
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
            <CRow>
                {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                    <>
                        <CCol xs={12} sm={12} md={12} lg={9} xl={9}>
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
                                                    {galleryStatus.map(
                                                        status => (
                                                            <option
                                                                value={
                                                                    status.value
                                                                }
                                                                key={
                                                                    status.name
                                                                }
                                                            >
                                                                {status.name}
                                                            </option>
                                                        )
                                                    )}
                                                </Input>
                                            </CCol>
                                        </CRow>
                                        <CRow className='my-2 d-flex align-items-center'>
                                            <CCol>
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
                                        onClick={handleDeleteOptions}
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
    return await updateGallery(request, params);
};

export const loader = async ({ request, params }) => {
    return await loadGallery(request, params);
};

export default memo(Gallery);
