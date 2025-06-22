export const getLocationSuggestions = async (query) => {
	const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const requestOptions = {
    method: 'GET',
  };

  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${apiKey}`,
      requestOptions
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();
    const suggestions = result.features.map((feature) => ({
			place_id: feature.properties.place_id,
      name: feature.properties.name || null,
      address_1: `${feature.properties.housenumber || ""} ${feature.properties.street || ""}`.trim(),
      address_2: "",
      city: feature.properties.city || "",
			state: feature.properties.state,
			zip: feature.properties.postcode,
      country: feature.properties.country,
			full_address: [
        feature.properties.name,
        [feature.properties.housenumber, feature.properties.street].filter(Boolean).join(" "),
        feature.properties.city || "",
        feature.properties.state,
        feature.properties.postcode
      ].filter(Boolean).join(", ")
    }));

    return suggestions;

  } catch (error) {
    return { error: true, message: error.message || 'An unknown error occurred' };
  }
};
