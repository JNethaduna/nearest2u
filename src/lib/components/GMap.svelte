<script lang="ts">
	import * as googlemaps from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';

	// Types
	type marker = {
		name: string;
		location: google.maps.LatLngLiteral;
		distance: google.maps.Distance;
		duration: google.maps.Duration;
	};

	// Props
	export let mapOptions: google.maps.MapOptions;
	export let markers: marker[];
	export let directions: boolean;

	let map: google.maps.Map | null;
	let mapContainer: HTMLDivElement;
	let loader: googlemaps.Loader | null;

	onMount(async () => {
		loader = new googlemaps.Loader({
			apiKey: 'AIzaSyCxDlEE3BUZ-r5dXi5JPJMm5Snr5kwe-e4',
			version: 'weekly'
		});

		// Map
		const { Map } = await loader.importLibrary('maps');
		map = new Map(mapContainer, mapOptions);
	});

	$: {
		if (markers) {
			renderMarkers();
			if (directions) {
				renderDirections();
			}
		}
	}

	async function renderMarkers() {
		if (loader) {
			const { Marker } = await loader.importLibrary('marker');
			markers.map((marker) => {
				const duration = marker.duration.text;
				const distance = marker.distance.text;
				const googleMarker = new Marker({
					position: { lat: marker.location.lat, lng: marker.location.lng }, // Changed storecoords to location
					map,
					title: marker.name,
					icon: {
						url: '/shopping.png',
						scaledSize: new google.maps.Size(64, 64)
					}
				});

				// creates info window
				const infoWindow = new google.maps.InfoWindow({
					content: `<div>Duration: ${duration} </div><div>Distance:${distance}</div>`
				});

				// makes marker clickable
				googleMarker.addListener('click', () => {
					infoWindow.open(map, googleMarker);
				});
			});
		}
	}

	async function renderDirections() {
		if (loader) {
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
						destination: {
							lat: marker.location.lat, // Changed storecoords to location
							lng: marker.location.lng // Changes storecoords to location
						},
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
	}
</script>

<div>
	<div class="absolute h-screen w-screen" bind:this={mapContainer} />
</div>
