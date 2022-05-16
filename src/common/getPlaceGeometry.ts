export const getPlaceGeometry = (
  placeId: string,
): Promise<google.maps.places.PlaceGeometry> => {
  const placesService = new window.google.maps.places.PlacesService(
    new google.maps.Map(document.createElement('div')),
  );

  return new Promise((resolve, reject) => {
    placesService.getDetails(
      {
        placeId,
        fields: ['geometry'],
      },
      (result, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          result &&
          result.geometry
        ) {
          resolve(result.geometry);
        } else {
          reject(status);
        }
      },
    );
  });
};

export default getPlaceGeometry;
