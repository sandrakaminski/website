import React, { lazy } from 'react';

import { useRoutes, useParams } from 'react-router-dom';

import Outline from './components/Outline';
import { useView } from "./client";

const Renderer = lazy(() => import('./blocks/Renderer'));
const NotFound = lazy(() => import('./views/NotFound'));
const Payment = lazy(() => import('./views/Payment'));

type Router = {
    path: string;
    element: React.ReactElement;
}

const Routes: React.FC = () => {
    const routes: Router[] = [
        { path: '/', element: <Component /> },
        { path: '/:slug', element: <Component /> },
        { path: '/:type/:slug', element: <Component /> },
        { path: '/cart', element: <Payment /> }
    ]
    return useRoutes(routes);
}

export default Routes;

const Component: React.FC = () => {
    var { type, slug } = useParams();
    [type, slug] = [type || "assembly", slug || "home"];
    const { content, error } = useView({ type, slug });

    if (error && error.status === 404) {
        return (<NotFound />)
    }

    return (
        <>
            {content ?
                <Renderer content={content} />
                :
                <Outline />
            }
        </>
    )
}