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
import AudioMessagesTable from '../../components/AudioMessagesTable';

const Audios = () => {
    const { audios } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            {audios && audios.length ? (
                <CRow>
                    <CCol xl={12} lg={12}>
                        <CCard>
                            <CCardHeader>Audios</CCardHeader>
                            <CCardBody>
                                <Await
                                    resolve={audios}
                                    errorElement={
                                        <CAlert color='danger'>
                                            An error occurred!
                                        </CAlert>
                                    }
                                    children={el => (
                                        <AudioMessagesTable audios={el} />
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
                            <CCardHeader>Audios</CCardHeader>
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
    return defer({ audios: await getAudios() });
};

export const getAudios = async () => {
    const { token } = getDataFromStorage();
    const res = await fetch(`${ENV.baseUrl}/audiomessages`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw res;
    const resData = await res.json();
    return transformedData(resData.data);
};

export default memo(Audios);
