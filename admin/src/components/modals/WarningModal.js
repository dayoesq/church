import React from 'react';
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react';
import PropTypes from 'prop-types';

const WarningModal = ({
    visible,
    onClose,
    title,
    modalContent,
    btnName,
    btnValue
}) => {
    return (
        <CModal alignment='center' visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>{modalContent}</CModalBody>
            <CModalFooter>
                <CButton color='secondary' onClick={onClose}>
                    Close
                </CButton>
                <CButton
                    color='danger'
                    name={btnName}
                    value={btnValue}
                    type='submit'
                    onClick={onClose}
                >
                    OK
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

WarningModal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    modalContent: PropTypes.string,
    btnName: PropTypes.string,
    btnValue: PropTypes.string
};

export default WarningModal;
