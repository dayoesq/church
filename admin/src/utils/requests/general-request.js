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
 * User updates self.
 *
 * @return Promise
 *
 * @param request
 */
export const updateSelf = async request => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/users/self/update`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: true }
        );
    }
};

/**
 * Create event.
 *
 * @return Promise
 *
 * @param request
 */
export const createEvent = async request => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/events`,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: false }
        );
    }
};

/**
 * Update a specific event.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const updateEvent = async (request, params) => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/events/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: true }
        );
    }
};

/**
 * Get a specific event.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadEvent = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/events/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

/**
 * Create user.
 *
 * @param request
 * @return Promise
 *
 */
export const createUser = async request => {
    return await Http.post(
        `${ENV.baseUrl}/users`,
        {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData.token}`
        },
        request,
        { isFormData: false }
    );
};

/**
 * Get a user.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadUser = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/users/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

/**
 * Get active users.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadActiveUsers = async request => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/users/active/all`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

/**
 * Load all users.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadAllUsers = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/users`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

/**
 * Update user by admin.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const updateUserByAdmin = async (request, params) => {
    if (storedData) {
        return await Http.patch(
            `${ENV.baseUrl}/users/${params.id}`,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: false }
        );
    }
};

/**
 * Create testimonial.
 *
 * @param request
 * @return Promise
 *
 */
export const createTestimonial = async request => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/testimonials`,
            {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: false }
        );
    }
};

/**
 * Update testimonial.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const updateTestimonial = async (request, params) => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/testimonials/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: true }
        );
    }
};

/**
 * Load testimonial.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadTestimonial = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/testimonials/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};

/**
 * Create podcast.
 *
 * @return Promise
 *
 * @param request
 */
export const createPodcast = async request => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/podcasts`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: true }
        );
    }
};

/**
 * Update a specific podcast.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const updatePodcast = async (request, params) => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/podcasts/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: true }
        );
    }
};

/**
 * Get a specific podcast.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadPodcast = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/podcasts/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
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
 * Create gallery.
 *
 * @param request
 * @return Promise
 *
 */
export const createGallery = async request => {
    if (storedData) {
       return await Http.post(
           `${ENV.baseUrl}/galleries`,
           {
               Authorization: `Bearer ${storedData.token}`
           },
           request,
           { isFormData: true }
       );
        
    }
};

/**
 * Update a specific gallery.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const updateGallery = async (request, params) => {
    if (storedData) {
        return await Http.post(
            `${ENV.baseUrl}/galleries/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request,
            { isFormData: true }
        );
    }
};

/**
 * Get a specific gallery.
 *
 * @return Promise
 *
 * @param request
 * @param params
 */
export const loadGallery = async (request, params) => {
    if (storedData) {
        return await Http.get(
            `${ENV.baseUrl}/galleries/${params.id}`,
            {
                Authorization: `Bearer ${storedData.token}`
            },
            request
        );
    }
};
