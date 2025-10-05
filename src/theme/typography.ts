import { TypographyVariantsOptions } from "@mui/material";

export const typography: TypographyVariantsOptions = {
    h1: {
        fontSize: '40px',
        fontWeight: 500,
        fontFamily: 'ltc-bodoni-175',
        letterSpacing: '0em',
        textTransform: 'uppercase',
        color: '#000',
    },
    h2: {
        fontSize: '45px',
        fontWeight: 400,
        fontFamily: 'Playfair Display SC, serif',
        fontStle: 'normal',
        textTransform: 'uppercase',
    },
    h3: {
        fontSize: '34px',
        fontWeight: 500,
        fontFamily: 'ArnoPro',
        fontStyle: 'normal',
        letterSpacing: '.02em'
    },
    h4: {
        fontSize: '1.75rem',
        fontWeight: 400,
        fontFamily: 'proxima-nova',
    },
    h5: {
        fontSize: '22px',
        fontWeight: 400,
        fontFamily: 'MonaSansSemiBold',
        letterSpacing: '.04em',
        textTransform: 'uppercase',
    },
    h6: {
        fontFamily: 'ltc-bodoni-175',
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: '24px',
        letterSpacing: '0.72px',
        textTransform: 'uppercase',
        textDecorationStyle: 'solid'
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
        fontSize: '14px',
        fontWeight: 300,
        fontFamily: 'ProximaNova',
        fontStyle: 'normal',
        letterSpacing: '.05em',
        lineHeight: '2em',
    },
    body2: {
        fontSize: '14px',
        fontWeight: 300,
        fontFamily: 'proxima-nova',
        color: '#00000080',
        letterSpacing: '.05em',
    },
    button: {
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Futura',
        letterSpacing: '.25em',
        "@media (max-width:809px)": {
            fontSize: '10px',
            letterSpacing: '.2em',
        },
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        fontFamily: 'proxima-nova',
    },
};
