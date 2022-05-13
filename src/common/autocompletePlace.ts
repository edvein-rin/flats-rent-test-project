const autocompletePlace = async (place: string): Promise<string[]> => {
  // > const response = await fetch(
  // >   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&key=API_KEY`,
  // > );
  // !!! CORS TROUBLES !!!
  // I can not make API requests due to CORS restrictions.
  // Meanwhile due to the test project rules I'm not allowed to install packages: neither
  // a plain googleapi script or a googleapi npm package.
  // Should I tweak back-end to fix CORS?

  // TEMPORARY WORKAROUND
  return place ? [place] : [];
};

export default autocompletePlace;
