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
import { cilUser, cilFile, cilPencil, cilCalendar } from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import { AuthContext } from '../../store/auth';
import { ROLES } from '../../utils/constants';
import { loadEvent, updateEvent } from '../../utils/requests/general-request';

const Event = () => {
    const [disabled, setDisabled] = useState(true);
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/events', true);

    const disableInputField = () => {
        setDisabled(disabled => !disabled);
    };

    return (
        <CRow className='justify-content-center'>
            {[ROLES.admin, ROLES.super].includes(authCtx.user.roles) && (
                <CCol md={8}>
                    <Alert
                        data={actionData}
                        message='Event updated successfully.'
                    />
                    <CCard>
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
                            <Form method='patch' noValidate>
                                <CRow>
                                    <CCol xs={12}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='Title'
                                            labelTitle='Title'
                                            icon={cilUser}
                                            data={actionData}
                                            defaultValue={loadedData.data.title}
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
                                            labelTitle='Content'
                                            data={actionData}
                                            icon={cilPencil}
                                            defaultValue={
                                                loadedData.data.decription
                                            }
                                            disabled={disabled}
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
                                            data={actionData}
                                            icon={cilUser}
                                            defaultValue={
                                                loadedData.data.organizedBy
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
                                            id='starts_at'
                                            name='starts_at'
                                            placeholder='Start Date'
                                            labelTitle='Start Date'
                                            icon={cilCalendar}
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.startsAt
                                            }
                                            disabled={disabled}
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
                                            data={actionData}
                                            defaultValue={
                                                loadedData.data.endsAt
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <Input
                                        element='input'
                                        id='_method'
                                        type='hidden'
                                        name='_method'
                                        value='PATCH'
                                    />
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
    return await updateEvent(request, params);
};

export const loader = async ({ request, params }) => {
    return await loadEvent(request, params);
};

export default memo(Event);
