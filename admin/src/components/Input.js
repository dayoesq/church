import {
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormSwitch,
    CFormTextarea,
    CInputGroup,
    CInputGroupText,
    CListGroup,
    CListGroupItem,
    CCol
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { STATUS_CODE } from '../utils/constants';

const Input = props => {
    const errorStyle = field => {
        return props.data &&
            props.data.message[field] &&
            props.data.statusCode === STATUS_CODE.unprocessableContent &&
            props.data.message[field].length > 0
            ? 'border border-danger'
            : undefined;
    };

    const errorMessage = () => {
        return (
            props.data &&
            props.data.message[props.id] &&
            props.data.statusCode === STATUS_CODE.unprocessableContent &&
            Object.keys(props.data.message).includes(props.id) && (
                <CListGroup>
                    {props.data.message[props.id].map(el => (
                        <CListGroupItem key={el} className='text-danger'>
                            {el}
                        </CListGroupItem>
                    ))}
                </CListGroup>
            )
        );
    };

    switch (props.element) {
        case 'input': {
            if (props.type.toLowerCase() === 'file') {
                return (
                    <>
                        <CCol>
                            <CFormLabel htmlFor={props.id}>
                                {props.labelTitle}
                            </CFormLabel>
                            <CInputGroup className='mb-2'>
                                <CInputGroupText>
                                    <CIcon icon={props.icon} />
                                </CInputGroupText>
                                <CFormInput
                                    type={props.type}
                                    id={props.id}
                                    name={props.id}
                                    value={props.value}
                                    onChange={props.onChange}
                                    multiple={props.multiple}
                                    accept={
                                        props.accept ??
                                        '.jpg, .png, .jpeg, .svg, .pdf'
                                    }
                                    placeholder={props.placeholder}
                                    className={`${
                                        props.className && props.className
                                    } ${errorStyle(props.id)}`}
                                    style={props.style}
                                    disabled={props.disabled}
                                    defaultValue={props.defaultValue}
                                />
                            </CInputGroup>
                        </CCol>
                        {errorMessage()}
                    </>
                );
            }
            if (props.type.toLowerCase() === 'datetime-local') {
                return (
                    <>
                        <CCol>
                            <CFormLabel htmlFor={props.id}>
                                {props.labelTitle}
                            </CFormLabel>
                            <CInputGroup className='mb-2'>
                                <CInputGroupText>
                                    <CIcon icon={props.icon} />
                                </CInputGroupText>
                                <CFormInput
                                    type={props.type}
                                    id={props.id}
                                    name={props.id}
                                    onChange={props.onChange}
                                    value={props.value}
                                    hidden={props.hidden}
                                    min={props.min ?? '2000-01-01'}
                                    max={props.max ?? '2090-01-01'}
                                    className={`${
                                        props.className && props.className
                                    } ${errorStyle(props.id)}`}
                                    style={props.style}
                                    disabled={props.disabled}
                                    defaultValue={props.defaultValue}
                                />
                            </CInputGroup>
                        </CCol>
                        {errorMessage()}
                    </>
                );
            }

            if (props.type.toLowerCase() === 'hidden') {
                return (
                    <>
                        <CFormInput
                            type={props.type}
                            id={props.id}
                            name={props.id}
                            value={props.value}
                        />
                    </>
                );
            }

            if (props.type.toLowerCase() === 'checkbox') {
                return (
                    <>
                        <CCol>
                            <CFormLabel htmlFor={props.id}>
                                {props.labelTitle}
                            </CFormLabel>
                            <CInputGroup className='mb-2'>
                                <CFormSwitch
                                    type={props.type}
                                    id={props.id}
                                    name={props.id}
                                    value={props.value}
                                    onChange={props.onChange}
                                    className={`${
                                        props.className && props.className
                                    } ${errorStyle(props.id)}`}
                                    style={props.style}
                                    disabled={props.disabled}
                                    checked={props.checked}
                                    defaultChecked={props.defaultChecked}
                                />
                            </CInputGroup>
                        </CCol>
                        {errorMessage()}
                    </>
                );
            }

            if (props.type.toLowerCase() === 'number') {
                return (
                    <>
                        <CCol>
                            <CFormLabel htmlFor={props.id}>
                                {props.labelTitle}
                            </CFormLabel>
                            <CInputGroup className='mb-2'>
                                <CInputGroupText>
                                    <CIcon icon={props.icon} />
                                </CInputGroupText>
                                <CFormInput
                                    type={props.type}
                                    id={props.id}
                                    name={props.id}
                                    value={props.value}
                                    min={props.min}
                                    max={props.max}
                                    onChange={props.onChange}
                                    className={`${
                                        props.className && props.className
                                    } ${errorStyle(props.id)}`}
                                    style={props.style}
                                    disabled={props.disabled}
                                    defaultChecked={props.defaultChecked}
                                />
                            </CInputGroup>
                        </CCol>
                        {errorMessage()}
                    </>
                );
            }

            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={props.id}>
                            {props.labelTitle}
                        </CFormLabel>
                        <CInputGroup className='mb-2'>
                            <CInputGroupText>
                                <CIcon icon={props.icon} />
                            </CInputGroupText>
                            <CFormInput
                                type={props.type}
                                id={props.id}
                                placeholder={props.placeholder}
                                name={props.id}
                                value={props.value}
                                hidden={props.hidden}
                                onChange={props.onChange}
                                className={`${
                                    props.className && props.className
                                } ${errorStyle(props.id)}`}
                                style={props.style}
                                disabled={props.disabled}
                                defaultValue={props.defaultValue}
                            />
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );
        }

        case 'textarea': {
            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={props.id}>
                            {props.labelTitle}
                        </CFormLabel>
                        <CInputGroup className='mb-2'>
                            <CInputGroupText>
                                <CIcon icon={props.icon} />
                            </CInputGroupText>
                            <CFormTextarea
                                type={props.type}
                                id={props.id}
                                name={props.id}
                                value={props.value}
                                onChange={props.onChange}
                                placeholder={props.placeholder}
                                className={`${
                                    props.className && props.className
                                } ${errorStyle(props.id)}`}
                                style={props.style}
                                disabled={props.disabled}
                                cols={props.cols ?? 10}
                                rows={props.rows ?? 10}
                                defaultValue={props.defaultValue}
                            />
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );
        }
        case 'select': {
            return (
                <>
                    <CCol>
                        <CFormLabel htmlFor={props.id}>
                            {props.labelTitle}
                        </CFormLabel>
                        <CInputGroup className='mb-2'>
                            <CInputGroupText>
                                <CIcon icon={props.icon} />
                            </CInputGroupText>
                            <CFormSelect
                                type={props.type}
                                id={props.id}
                                name={props.id}
                                value={props.value}
                                onChange={props.onChange}
                                placeholder={props.placeholder}
                                multiple={props.multiple}
                                className={`${
                                    props.className && props.className
                                } ${errorStyle(props.id)}`}
                                style={props.style}
                                disabled={props.disabled}
                                defaultValue={props.defaultValue}
                            >
                                {props.children}
                            </CFormSelect>
                        </CInputGroup>
                    </CCol>
                    {errorMessage()}
                </>
            );
        }

        default:
            return null;
    }
};

export default Input;
