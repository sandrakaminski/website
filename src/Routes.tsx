import React from 'react';

import { useRoutes, useParams } from 'react-router-dom';

import Renderer from './blocks/Renderer';
import NotFound from './blocks/NotFound';
import Outline from './components/Outline';
import { useView } from "./client";

const Routes: React.FC = () => {
    const routes = [
        { path: '/', element: <Component /> },
        { path: '/:slug', element: <Component /> }
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
