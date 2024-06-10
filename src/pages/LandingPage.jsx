import React from "react";
import mixedLandingImage from "../assets/mixedLandingImage.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import Stack from "@mui/material/Stack";

function LandingPage() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${mixedLandingImage})`,
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
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.65)", // Semi-transparent black overlay
          pointerEvents: "none", // Ensures the overlay doesn't interfere with user interactions
        }}
      ></Box>
      <Stack
        sx={{
          position: "relative",
          zIndex: 1,
          color: "text.primary",
          textAlign: "center",
          padding: "20px", // Adjust as needed
        }}
      >
        <BoltIcon />
        <Typography variant="h3" gutterBottom>
          <Box>Things are happening in your neighborhood...</Box>
          <Box>Enter your zip code to find them!</Box>
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            id="outlined-basic"
            label="zipcode"
            variant="outlined"
            sx={{
              backgroundColor: "#fff6eb",
              color: "text.primary",
              border: "none",
            }}
          />
          <Button
            variant="outlined"
            sx={{
              borderRadius: "17px",
              border: "none",
              backgroundColor: "#fff6eb",
              color: "text.primary",
            }}
          >
            find events
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default LandingPage;
