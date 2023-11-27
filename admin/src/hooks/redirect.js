import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STATUS_CODE } from '../utils/constants';

export const useRedirect = (dataObj, link, shouldRedirect = false) => {
    const [loadedData, setData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            [STATUS_CODE.ok, STATUS_CODE.created].includes(
                loadedData?.statusCode
            )
        ) {
            if (shouldRedirect) {
                setTimeout(() => {
                    navigate(`${link}`);
                }, 2000);
            }
        }
    }, [link, loadedData?.statusCode, navigate, shouldRedirect]);

    useEffect(() => {
        setData(dataObj);
    }, [dataObj]);
};
