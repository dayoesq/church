import { Navigate, useLoaderData } from 'react-router-dom';
import WidgetsDropdown from './widgets/WidgetsDropdown';
import { isAuthorized } from '../utils/helpers';
import { useEffect, useState } from 'react';
import { getTotalDues } from '../utils/requests/general-request';

const Dashboard = () => {
    // const [totalDues, setTotalDues] = useState(0);
    const { users } = useLoaderData();

    // useEffect(() => {
    //     (async () => {
    //         const res = await getTotalDues();
    //         setTotalDues(res.data);
    //     })();
    // }, []);

    return (
        <>
            {' '}
            {!isAuthorized() && <Navigate to='/' />}
            <WidgetsDropdown users={users} />
        </>
    );
};

export default Dashboard;