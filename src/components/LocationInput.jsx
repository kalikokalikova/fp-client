import React, { useState, useEffect } from "react";
import { getLocationSuggestions } from "../utils/geoapify";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function LocationInput({ setFormData }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!query) return;

    const fetchSuggestions = async () => {
      try {
        const result = await getLocationSuggestions(query);
        if (result.error) {
          // setError(result.message);
        } else {
          console.log(result)
          setSuggestions(result)
        }
      } catch (err) {
        // setError('Failed to fetch suggestions');
      }
    };
    fetchSuggestions();
  }, [query]);

  return (
    <>
      <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.full_address || ""}
      options={suggestions}
      onInputChange={(event, newInputValue) => {
        setQuery(newInputValue);
      }}
      onChange={(event, newValue) => {
        setFormData((prev) => ({ ...prev, location: newValue }));
      }}
      renderInput={(params) => <TextField {...params} label="location *" />}
    />
    </>
  );
}

export default LocationInput;
