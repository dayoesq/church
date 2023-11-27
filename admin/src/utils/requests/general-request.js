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
        `${ENV.baseUrl}/login`,
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
export const createInvestment = async request => {
    return await Http.post(
        `${ENV.baseUrl}/investments`,
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
export const updateInvestment = async (request, params) => {
    return await Http.patch(
        `${ENV.baseUrl}/investments/${params.id}`,
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
export const getInvestment = async (request, params) => {
    return await Http.get(
        `${ENV.baseUrl}/investments/${params.id}`,
        {
            Authorization: `Bearer ${storedData?.token}`
        },
        request
    );
};

/**
 * Create due.
 *
 * @params Object {request}
 * @return Promise
 *
 */
export const createDue = async request => {
    return await Http.post(
        `${ENV.baseUrl}/dues`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Create due for a specific user.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const createDueForOneUser = async (request, params) => {
    return await Http.patch(
        `${ENV.baseUrl}/users/${params.userId}/dues/new`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Update the due for the specified user.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const upsertDue = async (request, params) => {
    return await Http.patch(
        `${ENV.baseUrl}/dues/${params.dueId}/users/${params.userId}/due-amounts/${params.dueAmountId}`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Get dues for the specified user.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const loadUserDues = async (request, params) => {
    return await Http.get(
        `${ENV.baseUrl}/dues/${params.dueId}/users/${params.userId}/due-amounts/${params.dueAmountId}`,
        {
            Authorization: `Bearer ${storedData?.token}`
        },
        request
    );
};

/**
 * Create due amount.
 *
 * @params Object {request}
 * @return Promise
 *
 */
export const createDueAmount = async request => {
    return await Http.post(
        `${ENV.baseUrl}/due-amounts`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Get the specified due amount.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const getDueAmount = async (request, params) => {
    return await Http.get(
        `${ENV.baseUrl}/due-amounts/${params.id}`,
        {
            Authorization: `Bearer ${storedData?.token}`
        },
        request
    );
};

/**
 * Update due amount.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const updateDueAmount = async (request, params) => {
    return await Http.patch(
        `${ENV.baseUrl}/due-amounts/${params.id}`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
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
        storedData?.user.role === ROLE.user
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

/**
 * Update next of kin.
 *
 * @params Object {request} Object {params}
 * @return Promise
 *
 */
export const updateNextOfKin = async (request, params) => {
    return await Http.patch(
        `${ENV.baseUrl}/users/${params.id}/update-next-of-kin`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData?.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Fetch total dues from all users.
 *
 * @return Promise
 *
 */
export const getTotalDues = async () => {
    return await Http.getRequest(`${ENV.baseUrl}/users/dues/total-dues/all`, {
        Authorization: `Bearer ${storedData?.token}`
    });
};
