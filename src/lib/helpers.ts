export const geoJsonToLatLng = (location: location) => {
	return {
		lat: location.coordinates[1],
		lng: location.coordinates[0]
	};
};
