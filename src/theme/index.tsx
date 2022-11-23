import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import ArnoProCaption from './ArnoProCaption.ttf';
import { palette } from './palette';
import ProximaNova from './ProximaNovaAltReg.otf';
import { typography } from './typography';

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography,
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'ArnoPro';
                    src: url(${ArnoProCaption});
                    font-weight: 400;
                    font-style: normal;
                }
                @font-face {
                    font-family: 'ProximaNova';
                    src: url(${ProximaNova});
                    font-weight: 400;
                    font-style: normal;
                }
            `,
        }
    }
}));


export default theme;