import React, { useEffect } from 'react';

import ReactGA from 'react-ga';

interface TrackerProps {
    children: React.ReactNode;
}

const Tracker = (props: TrackerProps) => {
    const { children } = props
    useEffect(() => {
        ReactGA.initialize(import.meta.env.VITE_GA_ID);
        ReactGA.pageview(window.location.pathname + window.location.search);
        console.log(window.location.pathname)
    }, []);

    return <>{children}</>;
}
export default Tracker;