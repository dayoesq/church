import { CBadge } from '@coreui/react';
import { ROLES, STATUS } from './constants';

/**
 * Covert first letter to uppercase.
 *
 * @param String {data}
 * @return String
 *
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
 * @param String {status}
 * @return String
 *
 */
export const getStatus = status => {
    switch (status) {
        case STATUS.active:
            return 'success';
        case STATUS.pending:
            return 'warning';
        case STATUS.deleted:
            return 'danger';
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
        default:
            return 'primary';
    }
};

/**
 * Replace more than one space with one space and...
 * ...and more than one hyphen, '-', with just one hyphen.
 *
 * @param String {data}
 * @return String
 *
 */
export const replaceSpaceAndToUpperCase = data => {
    data.replace(/\s{1,}/gi, ' ');
    data.replace(/-{1,}/gi, '-');
    return data.toUpperCase();
};

/**
 * Transform the user data.
 *
 * @param Array Object {data}
 * @return Object {data}
 *
 */
export const transformedData = data => {
    return data.map((obj, index) => ({
        count: index + 1,
        ...obj,
        status: <CBadge color={getStatus(obj.status)}>{obj.status}</CBadge>
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
 * Check if user has a role 'admin'.
 *
 * @return Boolean
 *
 */
export const isAdmin = () => {
    const data = getDataFromStorage();
    return data && data.user.roles === ROLES.admin;
};

/**
 * Check if user has a role 'super'.
 *
 * @return Boolean
 *
 */
export const isSuper = () => {
    const data = getDataFromStorage();
    return data && data.user.roles === ROLES.super;
};

/**
 * Check if user has role 'user'.
 *
 * @return Boolean
 *
 */
export const isUser = () => {
    const data = getDataFromStorage();
    return data && data.user.roles === ROLES.user;
};

/**
 * Get localStorage object.
 *
 * @return Object {user}
 *
 */
export const getDataFromStorage = () => {
    return (
        sessionStorage.getItem('user') &&
        JSON.parse(sessionStorage.getItem('user'))
    );
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
 * @param Object {navigation} Object {data}
 * @return Boolean
 *
 */
export const disableButton = (navigation, data) => {
    return (
        navigation?.state === 'submitting' ||
        navigation?.state === 'loading' ||
        data?.message === 'success'
    );
};

/**
 * Format date to human-readable version.
 *
 * @param Object {date}
 * @return String
 *
 */
export const formatDate = date => {
    return (
        date &&
        new Date(date).toLocaleDateString('en-fi', {
            year: 'numeric',
            month: 'long'
        })
    );
};

/**
 * Format date to human-readable version.
 *
 * @param Object {date}
 * @return String
 *
 */
export const formatDateWithDay = date => {
    return (
        date &&
        new Date(date).toLocaleDateString('en-fi', {
            year: '2-digit',
            month: 'short',
            day: '2-digit'
        })
    );
};


