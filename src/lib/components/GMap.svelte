<script lang="ts">
	import * as googlemaps from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';

	// Props
	export let mapOptions: google.maps.MapOptions;
	//export let markers: { lat: number; lng: number; title: string }[];
	export let markers: { storecoords: { name: string; lat: number; lng: number; }; distance: number; duration: number; }[];
	export let directions: boolean;
	
	let map: google.maps.Map | null;
	let mapContainer: HTMLDivElement;
	let googleMarkers: google.maps.Marker[] = [];
	
	onMount(async () => {
		// TODO: Hide this at some point maybe
		const loader = new googlemaps.Loader({
			apiKey: 'AIzaSyCxDlEE3BUZ-r5dXi5JPJMm5Snr5kwe-e4',
			version: 'weekly'
		});

		// Map
		const { Map } = await loader.importLibrary('maps');
		map = new Map(mapContainer, mapOptions);
		//this is to remove the icons on map
		map.setOptions({ fullscreenControl: false,mapTypeControl: false });

		// Markers
		if (markers) {
			const { Marker } = await loader.importLibrary('marker');
			markers.map((marker) => {
				const duration = marker.duration;
   				const distance = marker.distance;
				const googleMarker = new Marker({
					position: { lat: marker.storecoords.lat, lng: marker.storecoords.lng},
					map,
					title:  marker.storecoords.name,
					icon: {
                        url: '/shopping.png', 
                        scaledSize: new google.maps.Size(64, 64), 
                        },
						
				});
				googleMarkers.push(googleMarker);

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
						destination: {
    lat: marker.storecoords.lat ,
    lng: marker.storecoords.lng 
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
	});
</script>

<div>
	<div class="absolute h-screen w-screen" bind:this={mapContainer} />
</div>
