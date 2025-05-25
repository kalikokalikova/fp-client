import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Anton, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#932253",
          borderRadius: 0,
          color: "white",
          textTransform: "capitalize",
          boxSizing: "border-box", // Ensure border-box is applied
          border: "1px solid transparent", // Contained button has a 1px transparent border
          padding: "6px 15px", // Adjusted padding for contained to account for its 1px border.
          // Original MUI default for medium contained is often 6px 16px.
          // (16px - 1px border = 15px effectively)

          "&:hover": {
            backgroundColor: "white !important",
            color: "#932253",
            border: "1px solid #932253 !important", // On hover, the border becomes visible
          },

          "&:focus": {},

          "&:active": {},
        },
        outlined: {
          backgroundColor: "white",
          color: "#932253 !important",
          boxSizing: "border-box", // Ensure border-box is applied
          border: "1px solid #932253", // Outlined button has a 1px visible border
          padding: "6px 15px", // Adjusted padding for outlined to match contained.
          // This should be the same as 'root' padding when considering the border.

          "&:hover": {
            backgroundColor: "#932253 !important",
            color: "white !important",
            borderColor: "#932253", // Example hover border color change
          },
          "&:focus": {},
          "&:active": {},
        },
        // If you're also using the 'text' variant and want consistency:
        text: {
          boxSizing: "border-box",
          border: "1px solid transparent", // Give it a transparent border too
          padding: "6px 15px", // Match padding to root
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)", // MUI default text button hover is usually subtle
            border: "1px solid transparent",
          },
          "&:focus": {
            outline: "none",
            border: "1px solid purple",
          },
          "&:active": {
            transform: "none",
          },
        },
      },
    },
  },
});

export default theme;
