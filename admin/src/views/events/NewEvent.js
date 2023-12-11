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
    cilUser,
    cilAt,
    cilPencil,
    cilCalendar,
    cilImage
} from '@coreui/icons';
import { useRedirect } from '../../hooks/redirect';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import { disableButton } from '../../utils/helpers';
import { createEvent } from '../../utils/requests/general-request';

const NewEvent = () => {
    const data = useActionData();
    const navigation = useNavigation();
    // Redirect conditionally!
    useRedirect(data, '/dashboard/events', true);

    return (
        <CRow className='justify-content-center'>
            <CCol md={6}>
                <Alert data={data} message='Event created successfully.' />
                <CCard>
                    <CCardHeader>
                        <small> New Event Form</small>
                    </CCardHeader>
                    <CCardBody>
                        <Form method='post' noValidate>
                            <CRow>
                                <CCol xs={12}>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='title'
                                        name='title'
                                        placeholder='Title'
                                        labelTitle='Title'
                                        data={data}
                                        icon={cilUser}
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
                                        data={data}
                                        icon={cilPencil}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12}>
                                    <Input
                                        element='input'
                                        type='text'
                                        id='organized_by'
                                        name='organized_by'
                                        placeholder='Organizer'
                                        labelTitle='Organizer'
                                        data={data}
                                        icon={cilAt}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} md={6} lg={6} xl={6}>
                                    <Input
                                        element='input'
                                        type='date'
                                        id='starts_at'
                                        name='starts_at'
                                        placeholder='Start Date'
                                        labelTitle='Start Date'
                                        icon={cilCalendar}
                                        data={data}
                                    />
                                </CCol>
                                <CCol xs={12} md={6} lg={6} xl={6}>
                                    <Input
                                        element='input'
                                        type='date'
                                        id='ends_at'
                                        name='ends_at'
                                        placeholder='End Date'
                                        labelTitle='End Date'
                                        icon={cilCalendar}
                                        data={data}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} md={6} lg={6} xl={6}>
                                    <Input
                                        element='input'
                                        id='photo'
                                        type='file'
                                        name='photo'
                                        labelTitle='Images'
                                        accept='.jpeg, .png, .jpg, .svg'
                                        icon={cilImage}
                                        multiple
                                        data={data}
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs={12} sm={12}>
                                    <CButton
                                        className='btn-facebook my-2'
                                        type='submit'
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
    return await createEvent(request);
};

export default NewEvent;
