import { ENV, STATUS } from '../constants';
import { getDataFromStorage } from '../helpers';

export const revalidate = async (login, logout) => {
    const storedData = getDataFromStorage();
    if (storedData) {
        try {
            const res = await fetch(
                `${ENV.baseUrl}/users/${storedData.user.id}/revalidate-self`,
                {
                    headers: {
                        Authorization: `Bearer ${storedData.token}`
                    }
                }
            );
            if (res.ok) {
                const resData = await res.json();
                const userObj = {
                    id: resData.data.id,
                    first_name: resData.data.firstName,
                    last_name: resData.data.lastName,
                    avatar: resData.data.avatar,
                    roles: resData.data.roles,
                    status: resData.data.status
                };

                if (resData.data.status !== STATUS.active) {
                    logout();
                    sessionStorage.removeItem('user');
                    window.location.replace('/');
                }
                if (
                    storedData.user.status !== resData.data.status ||
                    storedData.user.first_name !== resData.data.firstName ||
                    storedData.user.last_name !== resData.data.lastName ||
                    storedData.user.roles !== resData.data.roles ||
                    storedData.user.avatar !== resData.data.avatar
                ) {
                    login(userObj, storedData.token);
                    //window.location.replace('/dashboard/users');
                }
            }
        } catch (error) {
            // No need to display error!
        }
    }
};
