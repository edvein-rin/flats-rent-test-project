const getPlacePredictions = async (
  place: string,
): Promise<google.maps.places.AutocompletePrediction[]> => {
  if (!place) return [];

  const autocompleteService =
    new window.google.maps.places.AutocompleteService();

  const { predictions } = await autocompleteService.getPlacePredictions({
    input: place,
  });

  return predictions;
};

export default getPlacePredictions;
