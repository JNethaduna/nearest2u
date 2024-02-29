<script lang="ts">
	import * as googlemaps from '@googlemaps/js-api-loader';
	import GMap from '$lib/components/GMap.svelte';
	import { onMount } from 'svelte';
	import { geoJsonToLatLng } from '$lib/helpers';

	let mapOptions = {
		center: { lat: 6.821314369940506, lng: 80.04144677117178 },
		zoom: 17,
		fullscreenControl: false,
		mapTypeControl: false,
		streetViewControl: false
	};

	let markers: {
		name: string;
		location: google.maps.LatLngLiteral;
		distance: google.maps.Distance;
		duration: google.maps.Duration;
	}[];

	onMount(async () => {
		// Get the user origin from the browser later
		const origin: location = {
			type: 'Point',
			coordinates: [80.04144677117178, 6.821314369940506]
		};

		// Get the stores closeby from API endpoint (Returns every store in radius)
		const stores: {
			name: string;
			location: google.maps.LatLngLiteral;
		}[] = await getStores(origin, 1);

		// Load the Google Maps API
		const loader = new googlemaps.Loader({
			apiKey: 'AIzaSyCxDlEE3BUZ-r5dXi5JPJMm5Snr5kwe-e4',
			version: 'weekly'
		});

		// Distance Matrix to get the closest stores within the radius
		const { DistanceMatrixService } = await loader.importLibrary('routes');
		const service = new DistanceMatrixService();

		service.getDistanceMatrix(
			{
				origins: [geoJsonToLatLng(origin)],
				destinations: stores.map((store) => store.location),
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.METRIC
			},
			(response) => {
				if (response) {
					markers = addDistanceToStores(stores, response.rows[0].elements)
						.toSorted((a, b) => a.duration.value - b.duration.value)
						.slice(0, 5);
				}
			}
		);
	});

	async function getStores(origin: location, itemId: number) {
		const response = await fetch('/api/get-stores', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				itemId: itemId,
				origin: origin
			})
		});
		const data = await response.json();
		return data;
	}

	function addDistanceToStores(
		stores: {
			name: string;
			location: google.maps.LatLngLiteral;
		}[],
		distances: google.maps.DistanceMatrixResponseElement[]
	) {
		return stores.map((store, index) => {
			return {
				...store,
				distance: distances[index].distance as google.maps.Distance,
				duration: distances[index].duration as google.maps.Duration
			};
		});
	}
</script>

<GMap {mapOptions} {markers} directions={true} />
