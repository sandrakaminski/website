import React, { useEffect } from 'react';

import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

interface TrackerProps {
    children: React.ReactNode;
}

const Tracker = (props: TrackerProps) => {
    const { children } = props;
    const { pathname } = useLocation();

    useEffect(() => {
        const googleAnalytics = () => {
            window.scrollTo(0, 0);
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
            ReactGA.send({ hitType: "pageview", page: pathname, title: pathname });
        }
        googleAnalytics();
    }, [pathname]);

    return (
        <>
            {children}
        </>);
}
export default Tracker;