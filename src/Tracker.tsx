import React, { useEffect } from 'react';

import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

interface TrackerProps {
    children: React.ReactNode;
    flags?: {
        [key: string]: boolean;
    }
}

const Tracker = withLDConsumer()((props: TrackerProps) => {
    const { children, flags } = props;
    const { pathname } = useLocation();

    let shopExperimentVal: string;
    if (flags?.shopExperiment) {
        shopExperimentVal = "New shop features"
    } else {
        shopExperimentVal = "Standard shop features"
    }

    useEffect(() => {
        const googleAnalytics = () => {
            window.scrollTo(0, 0);
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
            ReactGA.send(
                {
                    hitType: "pageview",
                    page: pathname,
                    contentGroup1: shopExperimentVal,
                });
        }
        googleAnalytics();
    }, [pathname, shopExperimentVal]);

    return <>{children}</>
});
export default Tracker;

export const FeatureFlagger = withLDConsumer()((props: TrackerProps) => {
    const { flags, children } = props;

    return (flags?.shopExperiment ? <>{children}</> : null);
})
