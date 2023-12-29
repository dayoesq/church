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
    btnValue,
    onClick,
    type
}) => {
    return (
        <CModal alignment='center' visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {modalContent ||
                    'This data can no longer be retrieved once deleted! Are you sure?'}
            </CModalBody>
            <CModalFooter>
                <CButton color='secondary' onClick={onClose}>
                    Close
                </CButton>
                <CButton
                    color='danger'
                    name={btnName}
                    value={btnValue}
                    type={type}
                    onClick={onClick}
                >
                    Yes
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
