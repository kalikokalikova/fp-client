import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primaryDark: "#181818f5", // custom charcoal
    primaryLight: "#f5f5f5", // custom parchment
    text: {
      light: '#f5f5f5', // custome parchment
      dark: '#181818f5'
    },
  },
  typography: {
    fontFamily: 'Libre Franklin, sans-serif',
  },
});

export default theme;
