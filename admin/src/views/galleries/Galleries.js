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
import { getDataFromStorage } from '../../utils/helpers';
import { ENV } from '../../utils/constants';
import GalleryList from '../../components/GalleryList';

const Galleries = () => {
    const { galleries } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            {galleries && galleries.length ? (
                <Await
                    resolve={galleries}
                    errorElement={
                        <CAlert color='danger'>An error occurred!</CAlert>
                    }
                    children={el => <GalleryList galleries={el} />}
                />
            ) : (
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader>Galleries</CCardHeader>
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
    return defer({ galleries: await getGalleries() });
};

export const getGalleries = async () => {
    const { token } = getDataFromStorage();
    try {
        const res = await fetch(`${ENV.baseUrl}/galleries`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) throw res;
        const resData = await res.json();
        return resData.data;
    } catch (error) {
        return error;
    }
};

export default memo(Galleries);
