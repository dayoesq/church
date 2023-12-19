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
    cilPencil,
    cilAsterisk,
    cilContact,
    cilBadge,
    cilImage,
    cilElevator
} from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import { AuthContext } from '../../store/auth';
import { AUDIO_GENRE, ENV, ROLES } from '../../utils/constants';
import {
    loadPodcast,
    updatePodcast
} from '../../utils/requests/general-request';
import { postStatus } from '../testimonials/Testimonial';

export const audioGenre = [
    { name: 'Select Genre', value: undefined },
    { name: 'Sermon', value: AUDIO_GENRE.sermon },
    { name: 'Praise', value: AUDIO_GENRE.praise },
    { name: 'Worship', value: AUDIO_GENRE.worship },
    { name: 'Praise & Worship', value: AUDIO_GENRE.praiseWorship }
];

const Podcast = () => {
    const [disabled, setDisabled] = useState(true);
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/podcasts', true);

    const disableInputField = () => setDisabled(disabled => !disabled);

    return (
        <CRow className='justify-content-center'>
            {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                <>
                    <CCol xs={12} sm={12} md={12} lg={9} xl={9}>
                        <Alert
                            data={actionData}
                            message='Podcast updated successfully.'
                        />
                        <CCard className='mb-4'>
                            <CCardHeader className='d-flex justify-content-between'>
                                <small> Podcast Details</small>

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
                                                id='author'
                                                name='author'
                                                placeholder='Author'
                                                labelTitle='Author'
                                                data={actionData}
                                                icon={cilContact}
                                                defaultValue={
                                                    loadedData.data.author
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
                                                id='summary'
                                                name='summary'
                                                placeholder='Max 200 letters'
                                                labelTitle='Summary'
                                                data={actionData}
                                                icon={cilPencil}
                                                defaultValue={
                                                    loadedData.data.summary
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
                                                id='audios'
                                                type='file'
                                                name='audios'
                                                labelTitle='Audio'
                                                accept='.mp3, .wav, .ogg, .m4a, .flac'
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
                                                {postStatus.map(status => (
                                                    <option
                                                        value={status.value}
                                                        key={status.name}
                                                    >
                                                        {status.name}
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
                                                id='genre'
                                                name='genre'
                                                placeholder='Genre'
                                                labelTitle='Genre'
                                                icon={cilElevator}
                                                data={actionData}
                                                defaultValue={
                                                    loadedData.data.genre
                                                }
                                                disabled={disabled}
                                            >
                                                {audioGenre.map(status => (
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
                    {loadedData && loadedData.data.audios.length > 0 && (
                        <CCol xs={12} sm={12} md={12} lg={3} xl={3}>
                            <CCard>
                                <CCardBody>
                                    <audio
                                        controls
                                        className='bg-white max-w-full'
                                    >
                                        <source
                                            src={`${ENV.audios}/${loadedData.data.audios[0].url}`}
                                        />
                                    </audio>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    )}
                </>
            )}
        </CRow>
    );
};

export const action = async ({ request, params }) => {
    return await updatePodcast(request, params);
};

export const loader = async ({ request, params }) => {
    return await loadPodcast(request, params);
};

export default memo(Podcast);
