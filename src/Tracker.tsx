import React, { useEffect } from 'react';

import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

interface TrackerProps {
    children: React.ReactNode;
}

const Tracker = (props: TrackerProps) => {
    const { children } = props;
    const { pathname, state } = useLocation();

    // makes sure the function is only called once
    useEffect(() => {
        const googleAnalytics = () => {
            window.scrollTo(0, 0);
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
            ReactGA.send({ hitType: "pageview", page: pathname, title: state.data ? state.data : pathname });
        }
        googleAnalytics();
    }, [pathname, state]);

    return (
        <>
            {children}
        </>);
}
export default Tracker;