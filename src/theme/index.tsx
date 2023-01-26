import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import ArnoProCaption from './fonts/ArnoProCaption.ttf';
// import LTCBodoni from './fonts/LTC-Bodoni-175-W01-Regular.ttf';
import MonaSansSemiBold from './fonts/MonaSansSemiBold.ttf';
import ProximaNova from './fonts/ProximaNovaAltReg.otf';
import { palette } from './palette';
import { typography } from './typography';

// const LTCBodoni = 'https://use.typekit.net/qml2wmp.css '

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography,
    components: {
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


export default theme;