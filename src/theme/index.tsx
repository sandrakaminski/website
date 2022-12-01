import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import ArnoProCaption from './ArnoProCaption.ttf';
import LTCBodoni from './LTCBodoni175Regular.ttf';
import MonaSansSemiBold from './MonaSansSemiBold.ttf';
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
                    font-style: normal;
                }
                @font-face {
                    font-family: 'ProximaNova';
                    src: url(${ProximaNova});
                    font-style: normal;
                }
                @font-face {
                    font-family: 'ltc-bodoni-175';
                    src: url(${LTCBodoni});
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