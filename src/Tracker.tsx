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

const Tracker = ((props: TrackerProps) => {
    const { children } = props;
    const { pathname } = useLocation();

    // let shopExperimentVal: string;
    // if (flags?.shopExperiment) {
    //     shopExperimentVal = "New shop features"
    // } else {
    //     shopExperimentVal = "Standard shop features"
    // }

    useEffect(() => {
        const googleAnalytics = () => {
            window.scrollTo(0, 0);
            ReactGA.initialize(import.meta.env.VITE_GA_ID);
            ReactGA.send(
                {
                    hitType: "pageview",
                    page: pathname,
                    // contentGroup1: shopExperimentVal,
                });
        }
        googleAnalytics();
    }, [pathname]);

    return <>{children}</>
});
export default Tracker;


// launchdarkly 
export const FeatureFlagger = withLDConsumer()((props: TrackerProps) => {
    const { flags, children } = props;

    return (flags?.shopExperiment ? <>{children}</> : null);
})
