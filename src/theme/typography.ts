import FuturaCyrillicBook from './FuturaCyrillicBook.ttf';

export const typography: object = {
    h1: {
        fontSize: '45px',
        fontWeight: 400,
        fontFamily: 'Playfair Display SC',
        letterSpacing: '.02em',
    },
    h2: {
        color: '#000',
        fontSize: '34px',
        fontWeight: 400,
        fontFamily: 'arno-pro',
        fontStyle: 'normal',
        letterSpacing: '.02em',
        textTransform: 'none',
    },
    h3: {
        fontSize: '45px',
        fontWeight: 400,
        fontFamily: 'Playfair Display SC',
        fontStle: 'normal',
        textTransform: 'uppercase',
        letterSpacing: '0em',
        color: '#000000',
        margin: '0px, 0px, 45px',
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
        // fontFamily: 'proxima-nova',
    },
    subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        fontFamily: 'proxima-nova',
    },
    body1: {
        fontSize: '15px',
        fontWeight: 300,
        fontFamily: 'proxima-nova',
        letterSpacing: '.05em',
    },
    body2: {
        fontSize: '15px',
        fontWeight: 300,
        fontFamily: 'proxima-nova',
        color: '#00000080',
        letterSpacing: '.05em'
    },
    button: {
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: "Futura",
        letterSpacing: '.25em',
        src: `local('Futura'), local('FuturaCyrillicBook'), url(${FuturaCyrillicBook}) format('ttf')`,
    },
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        fontFamily: 'proxima-nova',
    },
};
