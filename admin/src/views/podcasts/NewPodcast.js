import { memo } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton
} from '@coreui/react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import {
    cilPencil,
    cilContact,
    cilAsterisk,
    cilImage,
    cilElevator
} from '@coreui/icons';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { disableButton } from '../../utils/helpers';
import { handleActions } from '../../utils/requests/general-request';
import { audioGenre } from './Podcast';
import { ENV } from '../../utils/constants';

const NewPodcast = () => {
    const data = useActionData();
    const navigation = useNavigation();
    // Redirect conditionally!
    useRedirect(data, '/dashboard/podcasts', true);

    return (
        <CRow className='justify-content-center'>
            <CCol md={6}>
                <Alert data={data} message='Podcast created successfully.' />
                <CCard>
                    <CCardHeader>
                        <small> New Podcast Form</small>
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
                                        id='title'
                                        name='title'
                                        placeholder='Title'
                                        labelTitle='Title'
                                        data={data}
                                        icon={cilAsterisk}
                                    />
                                </CCol>
                                <CCol xs={12} md={6} lg={6} xl={6}>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='author'
                                        name='author'
                                        placeholder='Author'
                                        labelTitle='Author'
                                        data={data}
                                        icon={cilContact}
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
                                        data={data}
                                        icon={cilPencil}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <Input
                                        element='input'
                                        id='audios'
                                        type='file'
                                        name='audios'
                                        labelTitle='Audio'
                                        accept='.mp3, .wav, .ogg, .m4a, .flac'
                                        icon={cilImage}
                                        data={data}
                                    />
                                </CCol>
                                <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
                                    <Input
                                        element='select'
                                        id='genre'
                                        name='genre'
                                        placeholder='Genre'
                                        labelTitle='Genre'
                                        icon={cilElevator}
                                        data={data}
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
                            <CRow>
                                <CCol>
                                    <CButton
                                        className='btn-facebook my-2'
                                        type='submit'
                                        name='intent'
                                        value='create'
                                        disabled={disableButton(
                                            navigation,
                                            data
                                        )}
                                    >
                                        <span>
                                            {navigation.state === 'submitting'
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
    );
};

export const action = async ({ request }) => {
    const uri = `${ENV.baseUrl}/podcasts`;
    return await handleActions(request, {
        uri,
        isFormData: true,
        assets: 'audios'
    });
};

export default memo(NewPodcast);
