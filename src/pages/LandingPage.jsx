import React, {useState} from "react";
import mixedLandingImage from "../assets/mixedLandingImage.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";


function LandingPage() {
  const [zipcode, setZipcode] = useState("");
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setZipcode(e.target.value);
  }

  const handleZipClick = () => {
    console.log("we submit: ",zipcode)
    // validate zip code here
    navigate("/events");

  }

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
          color: "text.light",
          padding: "20px",
          alignItems: "center"
        }}
      >
          <BoltIcon sx={{ fontSize: "4rem", marginBottom: "1rem" }} />
          <Typography variant="h3" sx={{ marginBottom: "1rem" }}>
            Things are happening in your neighborhood...
          </Typography>
          <Typography variant="h3" sx={{ marginBottom: "2.5rem" }}>
            Enter your zip code to find them!
          </Typography>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            onChange={handleInputChange}
            value={zipcode}
            id="outlined-basic"
            label="zipcode"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0px",
                "&.Mui-focused fieldset": {
                  borderColor: "primaryLight",
                },
                "&:hover fieldset": {
                  borderColor: "primaryLight",
                },
              },
              "& .MuiInputLabel-root": {
                color: "black",
                "&.Mui-focused": {
                  color: "black",
                },
              },
              backgroundColor: "primaryLight",
              color: "text.primary",
              border: "none",
            }}
          />
          <Button
            variant="outlined"
            onClick={handleZipClick}
            sx={{
              border: "none",
              backgroundColor: "primaryLight",
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
