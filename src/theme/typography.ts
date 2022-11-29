import FuturaCyrillicBook from './FuturaCyrillicBook.ttf';

export const typography: object = {
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
        margin: '0px, 0px, 45px',
    },
    h3: {
        fontSize: '34px',
        fontWeight: 500,
        fontFamily: 'ArnoPro',
        fontStyle: 'normal',
        letterSpacing: '.02em',
        textTransform: 'none',
    },
    h4: {
        fontSize: '1.75rem',
        fontWeight: 400,
        fontFamily: 'proxima-nova',
    },
    h5: {
        fontSize: '1.5rem',
        fontWeight: 500,
        fontFamily: 'proxima-nova',
    },
    h6: {
        fontSize: '1.25rem',
        fontWeight: 700,
        fontFamily: 'proxima-nova',
    },
    subtitle1: {
        fontSize: '1rem',
        fontWeight: 800,
        letterSpacing: '.025em',
    },
    subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        fontFamily: 'proxima-nova',
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
        src: `local('Futura'), url(${FuturaCyrillicBook}) format('ttf')`,
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        fontFamily: 'proxima-nova',
    },
};
