<script lang="ts">
	import MapBox from '$lib/components/MapBox.svelte';

	const initialState = { lng: 80.04144677117178, lat: 6.821314369940506, zoom: 17 };
</script>

<MapBox {initialState} />
