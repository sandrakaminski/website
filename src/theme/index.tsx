import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import { palette } from './palette';
import { typography } from './typography';

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography
}));

export default theme;