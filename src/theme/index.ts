import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import ArnoProCaption from './fonts/ArnoProCaption.ttf';
import MonaSansSemiBold from './fonts/MonaSansSemiBold.ttf';
import ProximaNova from './fonts/ProximaNovaAltReg.otf';
import { palette } from './palette';
import { typography } from './typography';

export const theme = responsiveFontSizes(createTheme({
    typography,
    palette,
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
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    zIndex: 1000,
                    height: "100%",
                    width: "100%",
                    maxWidth: "100%",
                    color: "white",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }
            }
        }
    }
}));