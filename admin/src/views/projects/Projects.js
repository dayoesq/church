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
import ProjectsTable from '../../components/ProjectsTable';

const Projects = () => {
    const { projects } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            {projects && projects.length ? (
                <CRow>
                    <CCol xl={12} lg={12}>
                        <CCard>
                            <CCardHeader>Projects</CCardHeader>
                            <CCardBody>
                                <Await
                                    resolve={projects}
                                    errorElement={
                                        <CAlert color='danger'>
                                            An error occurred!
                                        </CAlert>
                                    }
                                    children={el => (
                                        <ProjectsTable projects={el} />
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
                            <CCardHeader>Projects</CCardHeader>
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
    return defer({ projects: await getProjects() });
};

export const getProjects = async () => {
    const { token } = getDataFromStorage();
    const res = await fetch(`${ENV.baseUrl}/projects`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!res.ok) throw res;
    const resData = await res.json();
    return transformedData(resData.data);
};

export default memo(Projects);
