import React, { useState, useEffect } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
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

const commonInputStyles = {
  marginTop: "16px", // example style
  width: "100%",
  backgroundColor: "white", // custom parchment color
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#181818f5", // custom charcoal color
    },
    "&:hover fieldset": {
      borderColor: "#000", // Darker on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3f51b5", // Custom focus color (primary)
    },
  },
};

function CreateEventPage() {
  const [showEndDateTime, setShowEndDateTime] = useState(false);
	const backgroundImage = `url(${Day_1})`;
  const [formData, setFormData] = useState({
    title: "",
    startTime: dayjs().toISOString(),
    endTime: null,
    location: "",
    description: "",
    email: "",
    isShareable: true,
    allowQA: true,
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
    console.log(formData);

    try {
      const response = await api.post("/api/v1/events", {
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      console.log("Event created successfully", data);
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
          backgroundColor: "primaryLight",
          margin: "40px 27px",
          width: "80%",
          borderRadius: "6px",
        }}
      >
        {/* <Typography variant="h1" gutterBottom>
          Create Event
        </Typography> */}
        <FormControl component="form" onSubmit={handleSubmit}>
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

          <TextField
            id="location"
            label="location *"
            variant="outlined"
            value={formData.location}
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

          <TextField
            id="email"
            label="email *"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            sx={commonInputStyles}
          />

          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
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

          <Button type="submit" sx={{ marginTop: "20px" }}>create event</Button>
        </FormControl>
      </Container>
    </Box>
  );
}

export default CreateEventPage;
