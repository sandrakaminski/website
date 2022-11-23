import React, { useEffect } from 'react';

import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

interface TrackerProps {
    children: React.ReactNode;
}

const Tracker = (props: TrackerProps) => {
    const { children } = props;

    const { pathname, search } = useLocation();
    const initGA = ReactGA.initialize(import.meta.env.VITE_GA_ID);
    const track = ReactGA.pageview(pathname + search);

    useEffect(() => {
        initGA
        track
    }, [initGA, track]);

    return <>{children}</>;
}
export default Tracker;