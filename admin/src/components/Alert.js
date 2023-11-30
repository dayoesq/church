import { CAlert } from '@coreui/react';
import { STATUS_CODE } from '../utils/constants';

const Alert = ({ data, message }) => {
    if (
        data &&
        [STATUS_CODE.ok, STATUS_CODE.created].includes(data.statusCode) &&
        message
    ) {
        return (
            <CAlert color='success' dismissible>
                {message}
            </CAlert>
        );
    }

    if (
        data &&
        [
            STATUS_CODE.forbidden,
            STATUS_CODE.unauthorized,
            STATUS_CODE.conflict,
            STATUS_CODE.internalServerError,
            STATUS_CODE.badRequest,
            STATUS_CODE.serviceUnavailable,
            STATUS_CODE.notFound
        ].includes(data.statusCode)
    ) {
        return <CAlert color='danger'>{data.message}</CAlert>;
    }
};

export default Alert;
