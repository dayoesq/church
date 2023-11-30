import { useLoaderData } from 'react-router-dom';
import WidgetsDropdown from './widgets/WidgetsDropdown';
import { isAuthorized } from '../utils/helpers';

const Dashboard = () => {
    const { users } = useLoaderData();
    return (
        <>
            <WidgetsDropdown users={users} />
        </>
    );
};

export default Dashboard;
