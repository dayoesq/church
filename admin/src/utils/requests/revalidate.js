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
                    first_name: resData.data.first_name,
                    last_name: resData.data.last_name,
                    avatar: resData.data.avatar,
                    role: resData.data.role,
                    status: resData.data.status
                };

                if (resData.data.status !== STATUS.active) {
                    logout();
                    sessionStorage.removeItem('user');
                    window.location.replace('/');
                }
                if (
                    storedData.user.status !== resData.data.status ||
                    storedData.user.first_name !== resData.data.first_name ||
                    storedData.user.last_name !== resData.data.last_name ||
                    storedData.user.role !== resData.data.role ||
                    storedData.user.avatar !== resData.data.avatar
                ) {
                    login(userObj, storedData.token, storedData.expiration);
                    window.location.replace('/dashboard/users');
                }
            }
        } catch (error) {
            // No need to display error!
        }
    }
};
