import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import ArnoProCaption from './ArnoProCaption.ttf';
import { palette } from './palette';
import { typography } from './typography';

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography,
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'ArnoProCaption';
                    src: url(${ArnoProCaption});
                    font-weight: 400;
                    font-style: normal;
                }
            `,
        }
    }
}));


export default theme;