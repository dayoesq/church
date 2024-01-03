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
import BlogPostList from '../../components/BlogPostList';

const BlogPosts = () => {
    const { blogPosts } = useLoaderData();

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            {blogPosts && blogPosts.length ? (
                <Await
                    resolve={blogPosts}
                    errorElement={
                        <CAlert color='danger'>An error occurred!</CAlert>
                    }
                    children={el => <BlogPostList blogPosts={el} />}
                />
            ) : (
                <CRow className='justify-content-center'>
                    <CCol md={6}>
                        <CCard>
                            <CCardHeader>Blog Posts</CCardHeader>
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
    return defer({ blogPosts: await getGalleries() });
};

export const getGalleries = async () => {
    const { token } = getDataFromStorage();
    try {
        const res = await fetch(`${ENV.baseUrl}/blogs`, {
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

export default memo(BlogPosts);
