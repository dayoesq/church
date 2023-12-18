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
import PodcastTable from '../../components/PodcastTable';

const Podcasts = () => {
    const { podcasts } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            { podcasts && podcasts.length > 0 ? (
                <CRow>
                    <CCol xl={12} lg={12}>
                        <CCard>
                            <CCardHeader>Audios</CCardHeader>
                            <CCardBody>
                                <Await
                                    resolve={podcasts}
                                    errorElement={
                                        <CAlert color='danger'>
                                            An error occurred!
                                        </CAlert>
                                    }
                                    children={el => (
                                        <PodcastTable podcasts={el} />
                                    )}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ) : (
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader>Podcasts</CCardHeader>
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
    return defer({ podcasts: await getPodcasts() });
};

export const getPodcasts = async () => {
    const { token } = getDataFromStorage();
    const res = await fetch(`${ENV.baseUrl}/podcasts`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw res;
    const resData = await res.json();
    return transformedData(resData.data);
};

export default memo(Podcasts);
