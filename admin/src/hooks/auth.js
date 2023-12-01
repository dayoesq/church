import { useState, useEffect, useCallback } from 'react';
import { ENV, STATUS } from '../utils/constants';
import { getDataFromStorage } from '../utils/helpers';

export const useAuth = () => {
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);

    /**
     * Log in and set data in storage.
     * The parameters emanate from the login component.
     *
     * @param Object {user}
     * @param String {token}
     * @return void
     *
     */
    const login = useCallback((user, token) => {
        setUser(user);
        setToken(token);
        sessionStorage.setItem(
            'user',
            JSON.stringify({
                user,
                token
            })
        );
    }, []);

    /**
     * Log out and redirect to the login page.
     *
     * @return void
     *
     */
    const logout = useCallback(async () => {
        const storedData = getDataFromStorage();
        const res = await fetch(`${ENV.baseUrl}/auth/users/logout`, {
            headers: {
                Authorization: `Bearer ${storedData.token}`
            }
        });
        if (res.ok) {
            sessionStorage.removeItem('user');
            window.location.replace('/');
        }
    }, []);

    /**
     * Evaluate the difference in time and log the user out.
     *
     * @return void
     *
     */
    useEffect(() => {
        const storedData = getDataFromStorage();
        if (storedData) {
            if (
                !!storedData.token.length &&
                storedData.user.status === STATUS.active
            ) {
                login(storedData.user, storedData.token);
            }
        }
    }, [login]);

    return {
        user,
        token,
        login,
        logout
    };
};
