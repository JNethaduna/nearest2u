<script lang="ts">
	import GMap from '$lib/components/GMap.svelte';

	const mapOptions = {
		center: { lat: 6.821314369940506, lng: 80.04144677117178 },
		zoom: 17
	};

	const markers = [{ lat: 6.821314369940506, lng: 80.04144677117178, title: 'My Location' }];
</script>

<GMap {mapOptions} {markers} />
