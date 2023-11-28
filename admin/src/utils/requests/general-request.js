import { ENV, ROLES } from '../constants';
import { getDataFromStorage } from '../helpers';
import { Http } from '../http';

const storedData = getDataFromStorage();

/**
 * Login.
 *
 * @params Object {request}
 * @return Promise
 *
 */
export const login = async request => {
    return await Http.post(
        `${ENV.baseUrl}/auth/users/login`,
        {
            'Content-Type': 'application/json'
        },
        request,
        { isFormData: false }
    );
};

/**
 * Password reset request.
 *
 * @params Object {request}
 * @return Promise
 *
 */
export const passwordResetRequest = async request => {
    return await Http.post(
        `${ENV.baseUrl}/password-reset-request`,
        {
            'Content-Type': 'application/json'
        },
        request,
        { isFormData: false }
    );
};

/**
 * Password reset.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const passwordReset = async (request, params) => {
    const { password_reset_token } = params;
    const url = new URL(
        `${ENV.baseUrl}/password-reset/${password_reset_token}`
    );
    return await Http.post(
        url,
        {
            'Content-Type': 'application/json'
        },
        request,
        { isFormData: false }
    );
};

/**
 * User updates self.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const updateSelf = async (request, params) => {
    return await Http.post(
        `${ENV.baseUrl}/users/${params.id}/update-self`,
        {
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: true }
    );
};

/**
 * Create investment.
 *
 * @params Object {request}
 * @return Promise
 *
 */
export const createEvent = async request => {
    return await Http.post(
        `${ENV.baseUrl}/events`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Update a specific investment.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const updateEvent = async (request, params) => {
    return await Http.patch(
        `${ENV.baseUrl}/events/${params.id}`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Get a specific investment.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const getEvent = async (request, params) => {
    return await Http.get(
        `${ENV.baseUrl}/events/${params.id}`,
        {
            Authorization: `Bearer ${storedData?.token}`
        },
        request
    );
};

/**
 * Create user.
 *
 * @params Object {request}
 * @return Promise
 *
 */
export const createUser = async request => {
    return await Http.post(
        `${ENV.baseUrl}/users`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Get the specified user.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const loadUser = async (request, params) => {
    return await Http.get(
        `${ENV.baseUrl}/users/${params.id}`,
        {
            Authorization: `Bearer ${storedData?.token}`
        },
        request
    );
};

/**
 * Update user.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const updateUser = async (request, params) => {
    const url =
        storedData?.user.role === ROLES.user
            ? `${params.id}/update-self`
            : `${params.id}`;
    return await Http.patch(
        `${ENV.baseUrl}/users/${url}`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

