import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { useRoutes, useLocation } from 'react-router-dom';

import getKontentData from "./client";

interface Data {
    name: {
        value: string
    }
}

const Routes: React.FC = () => {
    const routes = [
        { path: '/', element: <Component /> },
        { path: '/:page', element: <Component /> },
        { path: '/styles', element: <Styles /> }
    ]
    return useRoutes(routes);
}

export default Routes;

const Component: React.FC = () => {
    const page = useLocation();
    const [pageVal, setPageVal] = useState<string>('');
    const [data, getData] = useState<Data>({ name: { value: '' } });

    console.log(pageVal)

    useEffect(() => {
        if (!page.state) {
            setPageVal('home')
        }
        else {
            setPageVal(page?.state?.data)
        }
    }, [page?.state?.data]);

    getKontentData({ name: pageVal ? pageVal : 'home', getData });

    return (
        <Typography variant="h2">
            {data && data.name.value}
        </Typography>
    )
}

const Styles: React.FC = () => {
    return (
        <p>Styles</p>
    )
}