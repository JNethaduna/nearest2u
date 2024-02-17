<script lang="ts">
	import * as googlemaps from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';

	// Props
	export let mapOptions: google.maps.MapOptions;
	export let markers: { lat: number; lng: number; title: string }[];
	export let directions: boolean;

	let map: google.maps.Map | null;
	let mapContainer: HTMLDivElement;

	onMount(async () => {
		// TODO: Hide this at some point maybe
		const loader = new googlemaps.Loader({
			apiKey: 'AIzaSyCxDlEE3BUZ-r5dXi5JPJMm5Snr5kwe-e4',
			version: 'weekly'
		});

		// Map
		const { Map } = await loader.importLibrary('maps');
		map = new Map(mapContainer, mapOptions);

		// Markers
		if (markers) {
			const { Marker } = await loader.importLibrary('marker');
			markers.map((marker) => {
				new Marker({
					position: { lat: marker.lat, lng: marker.lng },
					map,
					title: marker.title
				});
			});
		}

		// Directions
		if (markers && directions) {
			const { DirectionsService, DirectionsRenderer } = await loader.importLibrary('routes');
			const directionsService = new DirectionsService();

			const originLat = (mapOptions.center?.lat as number) || 0;
			const originLng = (mapOptions.center?.lng as number) || 0;

			markers.toReversed().map((marker, index) => {
				let directionsRenderer: google.maps.DirectionsRenderer;
				index === markers.length - 1
					? (directionsRenderer = new DirectionsRenderer({
							polylineOptions: {
								strokeColor: '#00FF00',
								strokeOpacity: 1,
								strokeWeight: 5
							},
							suppressMarkers: true
						}))
					: (directionsRenderer = new DirectionsRenderer({
							suppressMarkers: true
						}));
				directionsRenderer.setMap(map);
				directionsService.route(
					{
						origin: { lat: originLat, lng: originLng },
						destination: { lat: marker.lat, lng: marker.lng },
						travelMode: google.maps.TravelMode.WALKING
					},
					(response, status) => {
						if (status === 'OK') {
							directionsRenderer.setDirections(response);
						} else {
							window.alert('Directions request failed due to ' + status);
						}
					}
				);
			});
		}
	});
</script>

<div>
	<div class="absolute h-screen w-screen" bind:this={mapContainer} />
</div>
