import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Spinner from './components/Spinner';

// Actions.
import { action as newUserAction } from './views/users/NewUser';
import { action as loginAction } from './views/pages/Login';
import { action as passwordResetRequestAction } from './views/pages/password-reset/PasswordResetRequest';
import { action as passwordResetAction } from './views/pages/password-reset/PasswordReset';
import { action as userAction } from './views/users/User';
import { action as profileAction } from './views/Profile';

// Loaders
import { loader as usersLoader } from './views/users/Users';
import { loader as userLoader } from './views/users/User';

import './scss/style.scss';

// Containers
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = lazy(() => import('./views/pages/Login'));

// Internal components
const Dashboard = lazy(() => import('./views/Dashboard'));
const Users = lazy(() => import('./views/users/Users'));
const NewUser = lazy(() => import('./views/users/NewUser'));
const User = lazy(() => import('./views/users/User'));
const Profile = lazy(() => import('./views/Profile'));

// Pages
const PasswordResetRequest = lazy(() =>
    import('./views/pages/password-reset/PasswordResetRequest')
);
const PasswordReset = lazy(() =>
    import('./views/pages/password-reset/PasswordReset')
);

// Error boundary
const ErrorBoundary = lazy(() => import('./components/ErrorBoundary'));

const App = () => {
    const router = createBrowserRouter([
        {
            path: '/dashboard',
            element: <DefaultLayout />,
            errorElement: <ErrorBoundary />,
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                    loader: usersLoader
                },
                {
                    path: 'users',
                    element: <Users />,
                    loader: usersLoader
                },
                {
                    path: 'users/:id',
                    element: <User />,
                    loader: userLoader,
                    action: userAction
                },
                {
                    path: 'users/new',
                    element: <NewUser />,
                    action: newUserAction
                },
                
            ]
        },
        {
            path: '/',
            errorElement: <ErrorBoundary />,
            element: <Login />,
            action: loginAction
        },
        {
            path: '/password-reset-request',
            element: <PasswordResetRequest />,
            action: passwordResetRequestAction
        },
        {
            path: '/password-reset/:password_reset_token',
            element: <PasswordReset />,
            action: passwordResetAction
        }
    ]);

    return (
        <Suspense fallback={<Spinner asOverlay />}>
            <RouterProvider
                router={router}
                fallbackElement={<DefaultLayout />}
            />
        </Suspense>
    );
};

export default App;