import FuturaCyrillicBook from './FuturaCyrillicBook.ttf';

export const typography: Object = {
    h1: {
        fontSize: '2.5rem',
        fontWeight: 400,
        fontFamily: 'arnopro',
        letterSpacing: '.02em',
    },
    h2: {
        fontSize: '2.25rem',
        fontWeight: 500,
        fontFamily: 'proxima-nova',
    },
    h3: {
        fontSize: '2rem',
        fontWeight: 700,
        fontFamily: 'proxima-nova',
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
        fontWeight: 400,
        fontFamily: 'proxima-nova',
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
    paragraph: {
        fontSize: '15px',
        fontWeight: 300,
        fontFamily: 'proxima-nova',
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
