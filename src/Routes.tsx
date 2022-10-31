import React, { useState, useEffect } from 'react';

import { useRoutes, useLocation } from 'react-router-dom';

import getKontentData from "./Client";

type Data = {
    item: {
        elements: {
            name: {
                value: string
            }
        }
    }
}

const Routes: React.FC = () => {
    const routes = [
        { path: '/', element: <Component /> },
        { path: '/:item', element: <Component /> },
    ]
    return useRoutes(routes);
}

export default Routes;

const Component: React.FC = () => {
    const item = useLocation();
    const [pageVal, setPageVal] = useState<string>('');
    const [data, getData] = useState<Data>();

    useEffect(() => {
        if (!item?.state?.data) {
            setPageVal('home')
        }
        else {
            setPageVal(item?.state?.data)
        }
    }, [item?.state?.data]);

    getKontentData({ name: pageVal ? pageVal : 'home', getData });

    return (
        <div>
            {data?.item?.elements.name?.value}
        </div>
    )
}