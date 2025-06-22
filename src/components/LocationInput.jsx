import React, { useState, useEffect } from "react";
import { getLocationSuggestions } from "../utils/geoapify";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller } from 'react-hook-form';

function LocationInput({ control, name }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchSuggestions = async () => {
      try {
        const result = await getLocationSuggestions(query);
        if (result.error) {
          // handle error
        } else {
          console.log("Formatted suggestions:", result);
          setSuggestions(result);
        }
      } catch (err) {
        // handle error
      }
    };
    fetchSuggestions();
  }, [query]);

  return (
    <Controller
      name={name}
      rules={{ required: "Location is required" }}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Autocomplete
            {...field}
            disablePortal
            getOptionLabel={(option) => option.full_address || ""}
            options={suggestions}
            onInputChange={(event, newInputValue) => setQuery(newInputValue)} // Update query on input change
            onChange={(event, newValue) => {
              field.onChange(newValue); // Set value in form data
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                error={!!fieldState.error} // Show error state for validation
                helperText={fieldState.error?.message} // Display error message
              />
            )}
          />
        </>
      )}
    />
  );
}

export default LocationInput;
