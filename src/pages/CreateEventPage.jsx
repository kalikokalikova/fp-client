import React, { useState, useEffect } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  FormControlLabel,
  FormHelperText,
  Alert,
  Switch,
} from "@mui/material";
import api from "../api";
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
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      allow_qa: true,
    },
  });
  const [serverError, setServerError] = useState(null);
  const [showEndDateTime, setShowEndDateTime] = useState(false);

  useEffect(() => {
    if (!showEndDateTime) {
      setValue("end_date_time", null);
    }
  }, [showEndDateTime]);

  const handleEndDateTimeToggle = (e) => {
    setShowEndDateTime(!showEndDateTime);
  };

  // React Query mutation for form submission
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return api.post("/api/v1/events/", formData);
    },
    onSuccess: (response) => {
      // `response` is returned from mutationFn
      navigate(`/events/${response.data.data.event.event_id}`);
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        const backendErrors = error.response.data.errors;
        if (backendErrors) {
          Object.keys(backendErrors).forEach((field) => {
            setError(field, { type: "server", message: backendErrors[field] });
          });
        }
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    },
  });

  const onSubmit = (data) => {
    setServerError(null); // Reset server error on new submission
    mutation.mutate(data);
  };

  return (
    <Box>
      <Container>
        <Box>
          {serverError && <Alert severity="error">{serverError}</Alert>}
        </Box>
        <form component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              label="event title"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="outlined"
              sx={commonInputStyles}
            />

            <Controller
              name="start_date_time"
              control={control}
              defaultValue={dayjs()}
              rules={{
                required: "Start time is required.",
              }}
              render={({ field }) => (
                <MobileDateTimePicker
                  {...field} // This binds the field value and event handling
                  label="Start time"
                  sx={commonInputStyles}
                />
              )}
            />

            {showEndDateTime ? (
              <>
                <Controller
                  name="end_date_time"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="End time"
                      sx={commonInputStyles}
                    />
                  )}
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

            <LocationInput control={control} name="location" />

            <TextField
              label="host name"
              variant="outlined"
              {...register("host")}
              sx={commonInputStyles}
            />

            <TextField
              label="description"
              variant="outlined"
              {...register("description")}
              sx={commonInputStyles}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <Controller
                name="allow_qa"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} />}
                    label="Allow Q&A"
                  />
                )}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            className="action-button"
            sx={{ marginTop: "20px" }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default CreateEventPage;
