import React, { useEffect, JSX } from "react";

import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

type TrackerProps = {
    children: React.ReactNode;
    flags?: {
        [key: string]: boolean;
    };
};

const Tracker = (props: TrackerProps): JSX.Element => {
    const { children } = props;
    const { pathname } = useLocation();

    useEffect(() => {
        const googleAnalytics = () => {
            window.scrollTo(0, 0);
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
            ReactGA.send({
                hitType: "pageview",
                page: pathname,
            });
        };
        googleAnalytics();
    }, [pathname]);

    return <>{children}</>;
};
export default Tracker;
