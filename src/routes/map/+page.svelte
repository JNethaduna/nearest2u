<script lang="ts">
	import { Map, Marker } from '@beyonk/svelte-mapbox';

	const accessToken =
		'pk.eyJ1IjoiYXNobnRoIiwiYSI6ImNsc282YW9hMzBieXkybW5zOXF3YWgyMWMifQ.l54caXaNFKAtBj1n_CFm8w';
	const center: [number, number] = [80.04144677117178, 6.821314369940506];
	const zoom = 18;
	const coordinates = [80.04144677117178, 6.821314369940506];
</script>

<body class="w-svh h-svh">
	<Map {accessToken} {center} {zoom}>
		<Marker lng={coordinates[0]} lat={coordinates[1]} />
	</Map>
</body>
