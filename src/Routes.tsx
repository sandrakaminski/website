import React, { lazy } from 'react';

import { useQuery } from "@tanstack/react-query";
import { Entry } from 'contentful';
import { useRoutes, useParams } from 'react-router-dom';

import { fetchContent } from "@/contentful";
import { AnyEntry } from '@/types';

const Renderer = lazy(() => import('@/contentBlocks/ContentRenderer'));
const NotFound = lazy(() => import('@/views/NotFound'));
const Cart = lazy(() => import('@/views/Cart'));
const PaymentSuccess = lazy(() => import('@/views/PaymentSuccess'));

type Router = {
    path: string;
    element: React.ReactElement;
}

const Routes: React.FC = () => {
    const routes: Router[] = [
        { path: '/', element: <Content /> },
        { path: '/:slug', element: <Content /> },
        { path: '/:type/:slug', element: <Content /> },
        { path: '/cart', element: <Cart /> },
        { path: '/success', element: <PaymentSuccess /> },
    ]
    return useRoutes(routes);
}

export default Routes;

type Response = {
    data?: { items: Entry<AnyEntry>[] }
}

const Content = () => {
    let { type, slug, } = useParams();
    [type, slug] = [type || "assembly", slug || "home"];

    const res: Response = useQuery(['content', type, slug], fetchContent);

    if (res.data?.items.length === 0) {
        return <NotFound />
    }
    return <Renderer contentEntry={res.data?.items[0] as Entry<AnyEntry>} />
}