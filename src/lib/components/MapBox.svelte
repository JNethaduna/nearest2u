<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import { onMount, onDestroy } from 'svelte';
	import '../../../node_modules/mapbox-gl/dist/mapbox-gl.css';

	let map: mapboxgl.Map;
	let mapContainer: HTMLDivElement;
	export let initialState: { lng: number; lat: number; zoom: number };

	onMount(() => {
		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken:
				'pk.eyJ1IjoiYXNobnRoIiwiYSI6ImNsc282YW9hMzBieXkybW5zOXF3YWgyMWMifQ.l54caXaNFKAtBj1n_CFm8w',
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<div>
	<div class="absolute h-screen w-screen" bind:this={mapContainer} />
</div>
