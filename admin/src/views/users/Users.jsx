import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CAlert
} from '@coreui/react';
import { memo, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import UserTable from '../../components/UserTable';
import Spinner from '../../components/Spinner';
import { getDataFromStorage, transformedData } from '../../util/helpers';
import { ENV } from '../../util/constants';

const Users = () => {
    const { users } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            {users && users.length ? (
                <CRow>
                    <CCol xl={12} lg={12}>
                        <CCard>
                            <CCardHeader>Users</CCardHeader>
                            <CCardBody>
                                <Await
                                    resolve={users}
                                    errorElement={
                                        <CAlert color='danger'>
                                            An error occurred!
                                        </CAlert>
                                    }
                                    children={el => <UserTable users={el} />}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            ) : (
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader>Users</CCardHeader>
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
    return defer({ users: await getUsers() });
};

export const getUsers = async () => {
    const dataStorage = getDataFromStorage();
    const res = await fetch(`${ENV.baseUrl}/users`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${dataStorage?.token}`
        }
    });
    if (!res.ok) throw res;
    const resData = await res.json();
    const transformed = transformedData(resData.data);
    return transformed;
};

export default memo(Users);