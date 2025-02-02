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
    start_date_time: dayjs().toISOString(),
    end_date_time: null,
    location: {},
    description: "",
    allow_qa: true,
    host: "",
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
      const response = await api.post("/api/v1/events/", formData);

      if (response.error) {
        throw new Error("Failed to create event");
      }

      console.log("Event created successfully", response);
      navigate(`/events/${response.data.data.event.event_id}`);
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
          margin: "15px",
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
              value={dayjs(formData.start_date_time)}
              onChange={(newValue) => handleDateChange("start_date_time", newValue)}
            />
            {showEndDateTime ? (
              <>
                <MobileDateTimePicker
                  id="endTime"
                  label="end time"
                  value={formData.endTime ? dayjs(formData.end_date_time) : null}
                  onChange={(newValue) => handleDateChange("end_date_time", newValue)}
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
              id="host"
              label="host name"
              variant="outlined"
              value={formData.host}
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
                    id="allow_qa"
                    checked={formData.allow_qa}
                    onChange={handleChange}
                  />
                }
                label="Allow Q&A"
              />
            </Box>
          </Box>

          <Button type="submit" className="action-button" sx={{ marginTop: "20px" }}>
            create event
          </Button>
        </FormControl>
      </Container>
    </Box>
  );
}

export default CreateEventPage;
