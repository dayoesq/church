import { useState, useEffect, useCallback } from 'react';
import { ENV, STATUS } from '../utils/constants';
import { getDataFromStorage } from '../utils/helpers';
import { revalidate } from '../utils/requests/revalidate';
import CustomDate from '../utils/dates/date';

let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState();
    const [user, setUser] = useState();
    const [tokenExpiryDate, setTokenExpiryDate] = useState();

    /**
     * Log in and set data in storage.
     * The parameters emanate from the login component.
     *
     * @param Object {user} String {token} Object {expiryDate}
     * @return void
     *
     */
    const login = useCallback((user, token, expiryDate) => {
        setUser(user);
        setToken(token);
        const tokenExpirationDate = new Date(expiryDate);
        setTokenExpiryDate(tokenExpirationDate);
        sessionStorage.setItem(
            'user',
            JSON.stringify({
                user,
                token,
                expiration: tokenExpirationDate.toISOString()
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
        const res = await fetch(`${ENV.baseUrl}/auth/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            sessionStorage.removeItem('user');
            window.location.replace('/');
        }
    }, [token]);

    /**
     * Re-evaluate the user data at some specific intervals.
     *
     * @return void
     *
     */
    useEffect(() => {
        setInterval(() => {
            revalidate(login, logout);
        }, 60000);
    }, [login, logout]);

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
                storedData.token.length &&
                storedData.expiration &&
                storedData.user.status === STATUS.active
            ) {
                const remainingTime = tokenExpiryDate - new Date().getTime();
                if (remainingTime <= 300000) {
                    const logoutWarning = `Your session is about to timeout in ${new Date(
                        remainingTime
                    ).getMinutes()} minutes. 
                    Press OK to log out or Cancel to continue`;
                    if (window.confirm(logoutWarning) !== true) {
                        login(
                            storedData.user,
                            storedData.token,
                            CustomDate.addDays(300)
                        );
                    }
                    logoutTimer = setTimeout(logout, remainingTime);
                }

                logoutTimer = setTimeout(logout, remainingTime);
            } else {
                clearTimeout(logoutTimer);
            }
        }
    }, [token, logout, tokenExpiryDate, login]);

    /**
     * Check the session storage and persist log in.
     *
     * @return void
     *
     */
    useEffect(() => {
        const storedData = getDataFromStorage();
        if (storedData) {
            if (
                storedData.token.length &&
                storedData.user.status === STATUS.active &&
                new Date(storedData.expiration).getTime() > new Date().getTime()
            )
                login(
                    storedData.user,
                    storedData.token,
                    new Date(storedData.expiration)
                );
        }
    }, [login]);

    return { user, token, login, logout };
};
