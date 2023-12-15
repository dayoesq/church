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
    cilCalendar,
    cilAsterisk,
    cilContact,
    cilBadge,
    cilLocationPin,
    cilMoney,
    cilImage
} from '@coreui/icons';
import { memo, useContext, useState } from 'react';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { useRedirect } from '../../hooks/redirect';
import { AuthContext } from '../../store/auth';
import { ROLES } from '../../utils/constants';
import { loadEvent, updateEvent } from '../../utils/requests/general-request';
import { CustomDate } from '../../utils/requests/date';

const eventStatus = [
    { name: 'Select Status', value: undefined },
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'Ongoing', value: 'ongoing' },
    { name: 'Concluded', value: 'concluded' },
    { name: 'Cancelled', value: 'cancelled' }
];

const Event = () => {
    const [disabled, setDisabled] = useState(true);
    const loadedData = useLoaderData();
    const actionData = useActionData();
    const navigation = useNavigation();

    const authCtx = useContext(AuthContext);
    // Redirect to users!
    useRedirect(actionData, '/dashboard/events', true);

    const disableInputField = () => setDisabled(disabled => !disabled);

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
                            <Form
                                method='post'
                                noValidate
                                encType='multipart/form-data'
                            >
                                <CRow>
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            type='text'
                                            id='title'
                                            name='title'
                                            placeholder='Title'
                                            labelTitle='Title'
                                            icon={cilAsterisk}
                                            data={actionData}
                                            defaultValue={loadedData.data.title}
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
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
                                                loadedData.data.organizer
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
                                                loadedData.data.description
                                            }
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
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
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
                                        <Input
                                            element='input'
                                            id='avatar'
                                            type='file'
                                            name='avatar'
                                            labelTitle='Avatar'
                                            accept='.jpeg, .png, .jpg, .svg'
                                            icon={cilImage}
                                            data={actionData}
                                            disabled={disabled}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
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
                                            defaultValue={loadedData.data.fee}
                                            disabled={disabled}
                                        />
                                    </CCol>
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
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
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
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
                                    <CCol xs={12} sm={12} md={12} lg={6} xl={6}>
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
