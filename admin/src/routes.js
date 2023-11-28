import { lazy } from 'react';

const Dashboard = lazy(() => import('./views/Dashboard'));
const Users = lazy(() => import('./views/users/Users'));
const NewUser = lazy(() => import('./views/users/NewUser'));
const User = lazy(() => import('./views/users/User'));

const routes = [
    { path: '/', element: Dashboard },
    {
        path: '/users',
        name: 'Users',
        element: Users
    },
    {
        path: '/users/new',
        name: 'New User',
        element: NewUser
    },
    {
        path: '/users/:id',
        name: 'User',
        element: User
    },
    
];

export default routes;
