import { TypographyVariantsOptions } from "@mui/material";

export const typography: TypographyVariantsOptions = {
    h1: {
        fontFamily: 'ltc-bodoni-175, serif',
        fontSize: '40px',
        fontWeight: 500,
        letterSpacing: '0em',
        textTransform: 'uppercase',
        color: '#000',
    },
    h2: {
        fontFamily: 'Playfair Display SC, serif',
        fontSize: '45px',
        fontWeight: 400,
        fontStyle: 'normal',
        textTransform: 'uppercase',
    },
    h3: {
        fontFamily: 'arno-pro-caption, serif',
        fontSize: '34px',
        fontWeight: 500,
        fontStyle: 'normal',
        letterSpacing: '.02em',
    },
    h4: {
        fontFamily: 'proxima-nova-black, sans-serif',
        fontSize: '1.75rem',
        fontWeight: 400,
    },
    h5: {
        fontFamily: 'MonaSansSemiBold, sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        letterSpacing: '.04em',
        textTransform: 'uppercase',
    },
    h6: {
        fontFamily: 'ltc-bodoni-175, serif',
        fontSize: '24px',
        fontWeight: 400,
        fontStyle: 'normal',
        letterSpacing: '0.72px',
        textTransform: 'uppercase',
        textDecorationStyle: 'solid',
    },
    subtitle1: {
        fontSize: '1rem',
        fontWeight: 800,
        letterSpacing: '.025em',
    },
    subtitle2: {
        fontSize: '0.9rem',
        fontWeight: 800,
        letterSpacing: '.025em',
        "@media (max-width:809px)": {
            fontSize: '0.8rem',
            letterSpacing: '.02em',
        },
    },
    body1: {
        fontFamily: 'proxima-nova-black, sans-serif',
        fontSize: '14px',
        fontWeight: 300,
        fontStyle: 'normal',
        letterSpacing: '.05em',
        lineHeight: '2em',
    },
    body2: {
        fontFamily: 'proxima-nova-black, sans-serif',
        fontSize: '14px',
        fontWeight: 300,
        letterSpacing: '.05em',
        color: '#00000080',
    },
    button: {
        fontFamily: 'Futura, sans-serif',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '.25em',
        "@media (max-width:809px)": {
            fontSize: '10px',
            letterSpacing: '.2em',
        },
    },
    caption: {
        fontFamily: 'proxima-nova-black, sans-serif',
        fontSize: '0.75rem',
        fontWeight: 400,
    },
};
