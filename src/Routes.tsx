import React, { useState, useEffect } from 'react';

import { useRoutes, useLocation } from 'react-router-dom';

import getKontentData from "./client";

interface Data {
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
        // { path: '*', element: <NotFound /> },
    ]
    return useRoutes(routes);
}

export default Routes;

const Component: React.FC = () => {
    const item = useLocation();
    const [pageVal, setPageVal] = useState<string>('');
    const [data, getData] = useState<Data>();

    console.log(item)

    useEffect(() => {
        if (!item.state) {
            setPageVal('home')
        }
        else {
            setPageVal(item?.state?.data)
        }
    }, [item?.state?.data]);

    getKontentData({ name: pageVal ? pageVal : 'home', getData });

    return (
        <h1>
            {data?.item?.elements.name?.value}
        </h1>
    )
}

// const NotFound = () => {
//     return (
//         <h1>Not found</h1>
//     )
// }