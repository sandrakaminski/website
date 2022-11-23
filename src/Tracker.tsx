import React, { useEffect } from 'react';

import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

interface TrackerProps {
    children: React.ReactNode;
}

const Tracker = (props: TrackerProps) => {
    const { children } = props;

    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        ReactGA.initialize(import.meta.env.VITE_GA_ID);
        ReactGA.pageview(pathname);
    }, [pathname, search]);

    return <>{children}</>;
}
export default Tracker;