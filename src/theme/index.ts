import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import ArnoProCaption from './fonts/ArnoProCaption.ttf';
import MonaSansSemiBold from './fonts/MonaSansSemiBold.ttf';
import ProximaNova from './fonts/ProximaNovaAltReg.otf';
import { palette } from './palette';
import { typography } from './typography';

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography,
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    boxShadow: 'none',
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'ArnoPro';
                    src: url(${ArnoProCaption});
                    font-style: normal;
                }
                @font-face {
                    font-family: 'ProximaNova';
                    src: url(${ProximaNova});
                    font-style: normal;
                }
          
                @font-face {
                    font-family: 'MonaSansSemiBold';
                    src: url(${MonaSansSemiBold});
                    font-style: normal;
                }
            `,
        }
    }
}));