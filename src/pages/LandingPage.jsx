import React from "react";
import daylightLandingFade from "../assets/daylightLandingFade.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const landingPageStyles = {
  container: {
    backgroundImage: `url(${daylightLandingFade})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    textAlign: "center",
  },
  heading: {
    fontSize: "3em",
    margin: "0",
  },
};

function LandingPage() {
  return (
    <Box style={landingPageStyles.container}>
      <Typography variant="h2" gutterBottom>
        <Box>Things are happening in your neighborhood...</Box>
        <Box>Enter your zip code to find them!</Box>
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="outlined">Outlined</Button>
      </Box>
    </Box>
  );
}

export default LandingPage;
