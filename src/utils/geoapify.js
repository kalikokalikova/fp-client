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
			placeId: feature.properties.place_id,
      addressLine1: feature.properties.address_line1,
      addressLine2: feature.properties.address_line2,
      city: feature.properties.city,
			state: feature.properties.state,
			postcode: feature.properties.postcode,
      country: feature.properties.country,
			locationText: `${feature.properties.address_line1} ${feature.properties.address_line2}`
    }));

    return suggestions;

  } catch (error) {
    return { error: true, message: error.message || 'An unknown error occurred' };
  }
};