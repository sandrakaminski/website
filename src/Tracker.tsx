import React, { useCallback, useEffect, useState } from 'react';

import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

import Notifier from '@/components/Notifier';
import { countriesList } from '@/components/PaymentCalc';

interface TrackerProps {
    children: React.ReactNode;
}

type Location = {
    lat: string;
    lng: string;
}

type Country = {
    countryName: string;
    countryCode: string;
}

const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=';

const init = {
    countryName: '',
    countryCode: '',
}

const Tracker = (props: TrackerProps) => {
    const { children } = props;
    const { pathname } = useLocation();

    const [country, setCountry] = useState<Country>(init);
    const [open, setOpen] = useState<boolean>(false);
    const [location, setLocation] = useState<Location>({
        lat: '',
        lng: ''
    });

    // google analytics
    const googleAnalytics = useCallback(() => {
        window.scrollTo(0, 0);
        ReactGA.initialize(import.meta.env.VITE_GA_ID);
        ReactGA.send({ hitType: "pageview", page: pathname });
    }, [pathname]);

    // gets country info
    const getGeo = useCallback(async () => {
        if (!navigator.geolocation) {
            return;
        }
        navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
            const { latitude, longitude } = pos.coords;

            setLocation({
                lat: latitude.toString(),
                lng: longitude.toString()
            });
        });
        const resp = await fetch(`${url}${location.lat}&longitude=${location.lng}&localityLanguage=en`);
        if (resp.status === 200) {
            const data = await resp.json();
            setCountry({
                countryName: data.countryName,
                countryCode: data.countryCode
            })
        }

    }, [location.lat, location.lng]);

    // makes sure the function is only called once
    useEffect(() => {
        if (country === init) {
            getGeo();
        }
        else if (countriesList[country.countryCode] === undefined) {
            setOpen(true);
        }
        else {
            setOpen(false);
        }
        googleAnalytics();
    }, [googleAnalytics, country, getGeo]);

    return (
        <>
            {country.countryCode &&
                <Notifier open={open} message={`We are not currently shipping to ${country.countryName}.`} />
            }
            {children}
        </>);
}
export default Tracker;