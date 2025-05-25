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
    // fontFamily: "Reddit Sans Condensed, sans-serif",
    fontFamily: "Anton, sans-serif"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Default styles (if any)
        },
        '&.action': {
          backgroundColor: "gray",
          color: "white",
          borderRadius: '18px', // Pill shape
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '1.6rem',
        },
        h2: {
          fontSize: '1.5rem',
        },
        h3: {
          fontSize: '1rem',
          fontWeight: 'bold',
        },
        h4: {
          fontSize: '.75rem',
        },
        h5: {
          fontSize: '.5rem',
        },
        h6: {
          fontSize: '.25rem',
        },
      },
    },
  },
});

export default theme;
