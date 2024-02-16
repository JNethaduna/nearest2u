<script lang="ts">
	import * as googlemaps from '@googlemaps/js-api-loader';
	import { onMount } from 'svelte';

	let map: google.maps.Map | undefined;
	let mapContainer: HTMLDivElement;
	export let mapOptions: google.maps.MapOptions;
	export let markers: { lat: number; lng: number; title: string }[];

	onMount(() => {
		const loader = new googlemaps.Loader({
			apiKey: 'AIzaSyCxDlEE3BUZ-r5dXi5JPJMm5Snr5kwe-e4',
			version: 'weekly'
		});

		loader
			.importLibrary('maps')
			.then(({ Map }) => {
				map = new Map(mapContainer, mapOptions);
			})
			.catch((e) => {
				// do something
			});

		loader.importLibrary('marker').then(({ Marker }) => {
			markers.map((marker) => {
				new Marker({
					position: { lat: marker.lat, lng: marker.lng },
					map,
					title: marker.title
				});
			});
		});
	});
</script>

<div>
	<div class="absolute h-screen w-screen" bind:this={mapContainer} />
</div>
