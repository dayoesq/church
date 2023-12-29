import { ENV } from '../constants';
import { getDataFromStorage } from '../helpers';
import { Http } from '../http';

const storedData = getDataFromStorage();
/**
 * Login.
 *
 * @return Promise
 *
 * @param request
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
 * @return Promise
 *
 * @param request
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
 * @return Promise
 *
 * @param request
 * @param params
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
 * Delete specific model.
 *
 * @return Promise
 *
 * @param uri
 */
export const deleteHandler = async uri => {
    if (storedData) {
        const res = await fetch(uri, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${storedData.token}`
            }
        });
        return res.ok;
    }
};

/**
 * Perform create, update on the model.
 *
 * @param {Request} request - The request object.
 * @param {Object} options - Additional options for the operation.
 * @returns {Promise} - A Promise that resolves with the result of the operation.
 */
export const handleActions = async (request, options = null) => {
    const { token } = getDataFromStorage();
    try {
        const formData = await request.formData();
        const intent = formData.get('intent');

        let uri;
        let asset;

        // Process assets if options and assets are specified
        if (options && options.isFormData) {
            const { assets } = options;
            asset = formData.getAll(assets);

            Array.from(asset).forEach((file, index) => {
                formData.append(`${assets}[${index}]`, file);
            });
        }

        if (token) {
            if (
                intent.toLowerCase() === 'edit' ||
                intent.toLowerCase() === 'create'
            ) {
                if (options && options.uri) {
                    uri = options.uri;
                }

                const res = await fetch(uri, {
                    method: options && options.isFormData ? 'POST' : 'PATCH',
                    body:
                        options && options.isFormData
                            ? formData
                            : JSON.stringify(Object.fromEntries(formData)),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ...(options.isFormData
                            ? undefined
                            : { 'Content-Type': 'application/json' })
                    }
                });
                if (!res.ok) throw res;
                return await res.json();
            }
        }
    } catch (error) {
        return error;
    }
};

/**
 * Get a specific project.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadProject = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/projects/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

/**
 * Get a specific resource.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadResource = async (request, options = null) => {
    if (storedData && options && options.uri) {
        return await Http.get(
            options.uri,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

