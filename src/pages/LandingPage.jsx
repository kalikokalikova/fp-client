import React from "react";
import daylightLandingFade from "../assets/daylightLandingFade.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import Stack from "@mui/material/Stack";

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
      <Stack>
        <BoltIcon sx={{ color: "text.primary" }} />
        <Typography variant="h3" sx={{ color: "text.primary" }} gutterBottom>
          <Box>Things are happening in your neighborhood...</Box>
          <Box>Enter your zip code to find them!</Box>
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField id="outlined-basic" label="zipcode" variant="outlined" sx={{ backgroundColor: "#fff6eb", color: "text.primary", border: "none" }} />
          <Button variant="outlined" sx={{ borderRadius: "17px", border: "none", backgroundColor: "#fff6eb", color: "text.primary" }}>find events</Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default LandingPage;
