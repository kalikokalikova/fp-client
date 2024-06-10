import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primaryDark: "#181818", // custom charcoal
    primaryLight: "#f5f5f5", // custom parchment
    text: {
      light: '#f5f5f5', // custome parchment
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
