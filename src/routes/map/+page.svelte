<script lang="ts">
	import { Map, Marker } from '@beyonk/svelte-mapbox';

	const accessToken =
		'pk.eyJ1IjoiYXNobnRoIiwiYSI6ImNsdG4wNzAzaTAxaTcyam1waDAyYmh6c3AifQ.E3KQ_5fS0Fc63kEIh0IIRQ';
	const center: [number, number] = [80.04144677117178, 6.821314369940506];
	const zoom = 18;
	const markers: GeoJSON[] = [
		{ type: 'Point', coordinates: [80.04144677117178, 6.821314369940506] },
		{ type: 'Point', coordinates: [79.09144677117157, 6.871314369940576] }
	];
</script>

<body class="w-svh h-svh">
	<Map {accessToken} {center} {zoom}>
		{#each markers as marker}
			<Marker lng={marker.coordinates[0]} lat={marker.coordinates[1]} />
		{/each}
	</Map>
</body>
