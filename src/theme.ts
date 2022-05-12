import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: 'rgba(32,194,255,255)',
          }
        }
      : {
          // palette values for dark mode
          primary: {
            main: 'rgba(32,194,255,255)',
          },
          background: {
            default: grey[900],
            paper: grey[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

export const darkModeTheme = createTheme(getDesignTokens('dark'));
export const lightModeTheme = createTheme(getDesignTokens('light'));