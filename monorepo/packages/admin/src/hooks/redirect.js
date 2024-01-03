import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATUS_CODE } from '../utils/constants';

export const useRedirect = (dataObj, link, shouldRedirect = false) => {
    const [data, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            [
                STATUS_CODE.ok,
                STATUS_CODE.created,
                STATUS_CODE.noContent
            ].includes(data?.statusCode)
        ) {
            if (shouldRedirect) {
                setTimeout(() => {
                    navigate(`${link}`);
                }, 2000);
            }
        }
    }, [data?.statusCode, link, navigate, shouldRedirect]);

    useEffect(() => {
        setData(dataObj);
    }, [dataObj]);
};
