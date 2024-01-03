import {
    CAlert,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';
import { memo, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { getDataFromStorage, transformedData } from '../../utils/helpers';
import { ENV } from '../../utils/constants';
import EventsTable from '../../components/EventsTable';

const Events = () => {
    const { events } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            {events && events.length ? (
                <CRow>
                    <CCol xl={12} lg={12}>
                        <CCard>
                            <CCardHeader>Events</CCardHeader>
                            <CCardBody>
                                <Await
                                    resolve={events}
                                    errorElement={
                                        <CAlert color='danger'>
                                            An error occurred!
                                        </CAlert>
                                    }
                                    children={el => <EventsTable events={el} />}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ) : (
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader>Events</CCardHeader>
                            <CCardBody>
                                <h1 className='text-center'>No Data</h1>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )}
        </Suspense>
    );
};

export const loader = async () => {
    return defer({ events: await getEvents() });
};

export const getEvents = async () => {
    const { token } = getDataFromStorage();
    const res = await fetch(`${ENV.baseUrl}/events`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw res;
    const resData = await res.json();
    return transformedData(resData.data);
};

export default memo(Events);
