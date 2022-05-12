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
  };
};

const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#b0bec5',
    },
    secondary: {
      main: '#c75b39',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
