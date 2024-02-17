<script lang="ts">
	import GMap from '$lib/components/GMap.svelte';

	const mapOptions = {
		center: { lat: 6.821314369940506, lng: 80.04144677117178 },
		zoom: 17
	};

	const markers = [
		{ lat: 6.823361882144782, lng: 80.04176408129187, title: 'Store 1' },
		{ lat: 6.825290043183253, lng: 80.0406053670629, title: 'Store 2' },
		{ lat: 6.825516615054354, lng: 80.03855441675455, title: 'Store 6' },
		{ lat: 6.825319783099442, lng: 80.03539300991628, title: 'Store 8' },
		{ lat: 6.82118274432534, lng: 80.04054729144617, title: 'Store 10' }
	];
</script>

<GMap {mapOptions} {markers} directions={true} />
