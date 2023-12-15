import { CBadge } from '@coreui/react';
import { ROLES, STATUS } from './constants';

/**
 * Covert first letter to uppercase.
 *
 * @return String
 *
 * @param data
 */
export const capitalize = data => {
    return data.charAt(0).toUpperCase() + data.toLowerCase().slice(1);
};

/**
 * Reload the page.
 *
 */
export const reloadPage = () => {
    window.location.reload();
};

/**
 * Get the status and return the appropriate element with matching color.
 *
 * @return String
 *
 * @param status
 */
export const getBadge = status => {
    switch (status) {
        case STATUS.active:
            return 'success';
        case STATUS.pending:
            return 'warning';
        case STATUS.deleted:
            return 'danger';
        case STATUS.cancelled:
            return 'danger';
        case STATUS.concluded:
            return 'success';
        case STATUS.ongoing:
            return 'warning';
        case STATUS.upcoming:
            return 'info';
        case STATUS.closed:
            return 'danger';
        case STATUS.banned:
            return 'danger';
        case STATUS.current:
            return 'success';
        case STATUS.yes:
            return 'success';
        case STATUS.no:
            return 'warning';
        case STATUS.archived:
            return 'info';
        case STATUS.draft:
            return 'warning';
        case STATUS.published:
            return 'success';
        default:
            return 'primary';
    }
};

/**
 * Replace more than one space with one space and...
 * ...and more than one hyphen, '-', with just one hyphen.
 *
 * @return String
 *
 * @param data
 */
export const replaceSpaceAndToUpperCase = data => {
    data.replace(/\s{1,}/gi, ' ');
    data.replace(/-{1,}/gi, '-');
    return data.toUpperCase();
};

/**
 * Transform the user data.
 *
 * @return Object {data}
 *
 * @param data
 */
export const transformedData = data => {
    return data.map((obj, index) => ({
        count: index + 1,
        ...obj,
        status: <CBadge color={getBadge(obj.status)}>{obj.status}</CBadge>
    }));
};

/**
 * Check if user is authorized.
 *
 * @return Boolean
 *
 */
export const isAuthorized = () => {
    const data = getDataFromStorage();
    if (data) {
        return (
            data.token.length &&
            [ROLES.user, ROLES.admin, ROLES.super].includes(data.user.roles) &&
            data.user.status === STATUS.active
        );
    }
    return false;
};

/**
 * Check if user is authorized.
 *
 * @return Boolean
 *
 */
export const isAuthorizedSuperAdmin = () => {
    const data = getDataFromStorage();
    if (data) {
        return (
            data.token.length &&
            [ROLES.admin, ROLES.super].includes(data.user.roles) &&
            data.user.status === STATUS.active
        );
    }
    return false;
};

/**
 * Check if user is authorized.
 *
 * @return Boolean
 *
 */
export const isAuthorizedUser = () => {
    const data = getDataFromStorage();
    if (data) {
        return (
            data.token.length &&
            [ROLES.user].includes(data.user.roles) &&
            data.user.status === STATUS.active
        );
    }
    return false;
};

/**
 * Get localStorage object.
 *
 * @return Object {user}
 *
 */
export const getDataFromStorage = () => {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};

/**
 * Determine if sessionStorage is empty.
 *
 * @return Boolean
 *
 */
export const sessionIsEmpty = () => {
    return JSON.parse(sessionStorage.getItem('user')) === undefined || null;
};

/**
 * While loading or submitting, disable the button.
 *
 * @return Boolean
 *
 * @param navigation
 * @param data
 */
export const disableButton = (navigation, data) => {
    return (
        navigation?.state === 'submitting' ||
        navigation?.state === 'loading' ||
        data?.message === 'success.'
    );
};
