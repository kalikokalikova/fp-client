import React, { useState, useEffect } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import {
  Typography,
  Container,
  Box,
  FormControl,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import api from "../api";
import { Day_1 } from "../assets/cards";
import LocationInput from "../components/LocationInput";

const commonInputStyles = {
  marginTop: "16px",
  width: "100%",
  backgroundColor: "white",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#01010133",
    },
    "&:hover fieldset": {
      borderColor: "#01010133",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#01010133",
    },
  },
};

function CreateEventPage() {
  const navigate = useNavigate();
  const userLoggedIn = false;
  const [showEndDateTime, setShowEndDateTime] = useState(false);
  const backgroundImage = `url(${Day_1})`;
  const [formData, setFormData] = useState({
    title: "",
    startDateTime: dayjs().toISOString(),
    endDateTime: null,
    location: {},
    description: "",
    isShareable: true,
    allowQA: true,
    hostName: "",
    phone: "",
    password: "",
  });


  useEffect(() => {
    if (!showEndDateTime) {
      setFormData((prev) => ({ ...prev, endTime: null }));
    }
  }, [showEndDateTime]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (id, newValue) => {
    setFormData((prev) => ({ ...prev, [id]: dayjs(newValue).toISOString() }));
  };

  const handleEndDateTimeToggle = (e) => {
    setShowEndDateTime(!showEndDateTime);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/v1/events", formData);

      if (response.error) {
        throw new Error("Failed to create event");
      }

      const data = await response.data;
      console.log("Event created successfully", data);
      navigate(`/events/${response.data.id}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundImage: backgroundImage, // Add the image URL here
        backgroundPosition: "bottom", // Centers the image
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          backgroundColor: "white",
          margin: "40px 27px",
          width: "80%",
          borderRadius: "6px",
        }}
      >
        <FormControl component="form" onSubmit={handleSubmit}>
          <Box className="event-info">
            <Typography variant="h3" gutterBottom>
              Event Info
            </Typography>
            <TextField
              id="title"
              label="event title *"
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
              sx={commonInputStyles}
            />

            <MobileDateTimePicker
              sx={commonInputStyles}
              id="startTime"
              label="start time *"
              value={dayjs(formData.startTime)}
              onChange={(newValue) => handleDateChange("startTime", newValue)}
            />
            {showEndDateTime ? (
              <>
                <MobileDateTimePicker
                  id="endTime"
                  label="end time"
                  value={formData.endTime ? dayjs(formData.endTime) : null}
                  onChange={(newValue) => handleDateChange("endTime", newValue)}
                  sx={commonInputStyles}
                />
                <FormHelperText
                  sx={{
                    textAlign: "right",
                    margin: 0,
                    textDecoration: "underline",
                  }}
                  onClick={handleEndDateTimeToggle}
                >
                  - remove end time
                </FormHelperText>
              </>
            ) : (
              <FormHelperText
                sx={{
                  textAlign: "right",
                  margin: 0,
                  textDecoration: "underline",
                }}
                onClick={handleEndDateTimeToggle}
              >
                + add end time
              </FormHelperText>
            )}

						<LocationInput setFormData={setFormData} />

						<TextField
              id="hostName"
              label="host name"
              variant="outlined"
              value={formData.hostName}
              onChange={handleChange}
              sx={commonInputStyles}
            />

            <TextField
              id="description"
              label="description"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              sx={commonInputStyles}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id="isShareable"
                    checked={formData.isShareable}
                    onChange={handleChange}
                  />
                }
                label="Allow guests to share event"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id="allowQA"
                    checked={formData.allowQA}
                    onChange={handleChange}
                  />
                }
                label="Allow Q&A"
              />
            </Box>
          </Box>

          {userLoggedIn && (
            <Box className="user-info" sx={{ margin: "20px 0" }}>
              <Typography variant="h3" gutterBottom>
                Your Info
              </Typography>
              <TextField
                id="phone"
                label="phone number *"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                sx={commonInputStyles}
              />

              <FormControlLabel
                sx={{ marginTop: "8px" }}
                control={
                  <Checkbox
                    id="isShareable"
                    checked={formData.isShareable}
                    onChange={handleChange}
                  />
                }
                label="I want to be able to edit this event after it's created."
              />
            </Box>
          )}

          <Button type="submit" className="action-button" sx={{ marginTop: "20px" }}>
            create event
          </Button>
        </FormControl>
      </Container>
    </Box>
  );
}

export default CreateEventPage;
