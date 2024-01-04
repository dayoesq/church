import React from 'react';
import {
    CCol,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CFormTextarea,
    CFormSelect,
    CFormSwitch,
    CListGroup,
    CListGroupItem
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { STATUS_CODE } from '../utils/constants';
import {Editor} from "@tinymce/tinymce-react";

const Input = ({
    id,
    labelTitle,
    icon,
    type,
    value,
    onChange,
    min,
    max,
    placeholder,
    className,
    style,
    disabled,
    defaultValue,
    multiple,
    accept,
    checked,
    defaultChecked,
    cols,
    rows,
    children,
    element,
    data,
                   textareaName
}) => {
    const hasError = () => {
        const isFileInput = element === 'input' && type && type.toLowerCase() === 'file';
        const hasValidationErrors =
            data &&
            data.message[id] &&
            data.statusCode === STATUS_CODE.unprocessableContent &&
            Object.keys(data.message).includes(id);

        // Handle special case for file input type and attributes with brackets in the name
        if (hasValidationErrors && isFileInput) {
            // Check if there are errors for the specific file input
            const fileInputErrors = data.message[id].filter(error =>
                error.startsWith(`${id}[`) || error.startsWith(`${id}.`)
            );

            // Display errors for the file input
            if (fileInputErrors.length > 0) {
                return true;
            }
        }

        return hasValidationErrors;
    };





    const errorStyle = () => {
        return hasError() ? 'border border-danger' : undefined;
    };

    const errorMessage = () => {
        if (hasError()) {
            return (
                <CListGroup>
                    {data.message[id].map(el => (
                        <CListGroupItem key={el} className='text-danger'>
                            {el}
                        </CListGroupItem>
                    ))}
                </CListGroup>
            );
        }
        return null;
    };

    const commonProps = {
        id,
        name: id,
        value,
        onChange,
        className: `${className} ${errorStyle()}`,
        style,
        disabled,
        defaultValue,
        textareaName: id
    };

    switch (element) {
        case 'input':
            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={id}>{labelTitle}</CFormLabel>
                        <CInputGroup className='mb-2'>
                            <CInputGroupText>
                                <CIcon icon={icon} />
                            </CInputGroupText>
                            {type.toLowerCase() === 'file' ? (
                                <CFormInput
                                    type={type}
                                    accept={accept}
                                    placeholder={placeholder}
                                    multiple={multiple}
                                    {...commonProps}
                                />
                            ) : type.toLowerCase() === 'datetime-local' ||
                              type.toLowerCase() === 'date' ? (
                                <CFormInput
                                    type={type}
                                    min={min ?? '2000-01-01'}
                                    max={max ?? '2090-01-01'}
                                    {...commonProps}
                                />
                            ) : type.toLowerCase() === 'checkbox' ? (
                                <CFormSwitch
                                    type={type}
                                    checked={checked}
                                    defaultChecked={defaultChecked}
                                    {...commonProps}
                                />
                            ) : type.toLowerCase() === 'number' ? (
                                <CFormInput
                                    type={type}
                                    min={min}
                                    max={max}
                                    {...commonProps}
                                />
                            ) : (
                                <CFormInput
                                    type={type}
                                    placeholder={placeholder}
                                    {...commonProps}
                                />
                            )}
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );

        case 'tinymce':
            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={id}>{labelTitle}</CFormLabel>
                        <CInputGroup className='mb-2'>
                            <Editor
                                apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                                initialValue={value}
                                init={{
                                    width: '100%',
                                    menubar: false,
                                    plugins:
                                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                    toolbar:
                                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                }}
                                {...commonProps}
                            />
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );

        case 'textarea':
            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={id}>{labelTitle}</CFormLabel>
                        <CInputGroup className='mb-2'>
                            <CInputGroupText>
                                <CIcon icon={icon} />
                            </CInputGroupText>
                            <CFormTextarea
                                cols={cols ?? 10}
                                rows={rows ?? 10}
                                {...commonProps}
                            />
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );

        case 'select':
            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={id}>{labelTitle}</CFormLabel>
                        <CInputGroup className='mb-2'>
                            <CInputGroupText>
                                <CIcon icon={icon} />
                            </CInputGroupText>
                            <CFormSelect multiple={multiple} {...commonProps}>
                                {children}
                            </CFormSelect>
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );

        default:
            return null;
    }
};

export default Input;
