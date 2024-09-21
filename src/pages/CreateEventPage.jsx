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

function CreateEventPage() {
  const [showEndDateTime, setShowEndDateTime] = useState(false);
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
		console.log(formData)
	}, [formData])

	useEffect(() => {
		if (!showEndDateTime) {
			setFormData((prev) => ({ ...prev, endTime: null}))
		}
	}, [showEndDateTime])

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
	}

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
    <Box sx={{ backgroundColor: "white" }}>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Create Event</Typography>
        <FormControl component="form" onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="event title *"
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
          />

          <MobileDateTimePicker
            id="startTime"
            label="start time *"
            value={dayjs(formData.startTime)}
            onChange={(newValue) => handleDateChange("startTime", newValue)}
          />
          {showEndDateTime ? (
						<><MobileDateTimePicker
						id="endTime"
						label="end time"
						value={formData.endTime ? dayjs(formData.endTime) : null}
						onChange={(newValue) => handleDateChange("endTime", newValue)}
					/>
					<FormHelperText onClick={handleEndDateTimeToggle}>- remove end time</FormHelperText></>

          ) : (
						<FormHelperText onClick={handleEndDateTimeToggle}>+ add end time</FormHelperText>
					)}

          <TextField
            id="location"
            label="location *"
            variant="outlined"
            value={formData.location}
            onChange={handleChange}
          />

          <TextareaAutosize
            placeholder="Enter event description here"
            value={formData.description}
            onChange={handleChange}
            id="description"
          />

          <TextField
            id="email"
            label="email *"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
          />

          <Box>
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

          <Button type="submit">create event</Button>
        </FormControl>
      </Container>
    </Box>
  );
}

export default CreateEventPage;