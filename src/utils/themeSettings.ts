import { createTheme } from '@mui/material';

type ThemeOptions = {
  palette: {
    type: string;
    primary: {
      main: string;
    };
    secondary: {
      main: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  };
};

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#b0bec5',
    },
    secondary: {
      main: '#c75b39',
    },
    error: {
      main: '#d1010b',
      light: '#f16151',
      dark: '#aa3128',
      contrastText: '#ffffff',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
