<script lang="ts">
	let storeLocationLat = '10.000';
	let storeLocationLng = '1.000';
	import { onMount, afterUpdate } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

	let map;
	let coordinates = null;
	let marker = null;
	let isMapVisible = false;

	onMount(() => {
		initializeMap();
	});

	afterUpdate(() => {
		if (isMapVisible) {
			// Force re-render the map after it becomes visible
			map.resize();
		}
	});

	function initializeMap() {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiYXNobnRoIiwiYSI6ImNsdG4wNzAzaTAxaTcyam1waDAyYmh6c3AifQ.E3KQ_5fS0Fc63kEIh0IIRQ';

		map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [parseInt(storeLocationLat), parseInt(storeLocationLng)],
			zoom: 8
		});
		// geocoder used to search for locations
		const geocoder = new MapboxGeocoder({
			accessToken: mapboxgl.accessToken,
			mapboxgl: mapboxgl,
			marker: false,
			placeholder: ' ' // Custom placeholder text
		});

		map.addControl(geocoder);
		//show the current location
		//
		map.on('click', (e) => {
			// Store the coordinates
			coordinates = [e.lngLat.lng, e.lngLat.lat];

			if (marker) {
				marker.remove();
			}
			// Add a marker at the clicked location
			marker = new mapboxgl.Marker().setLngLat([coordinates[0], coordinates[1]]).addTo(map);
		});
	}

	function openMap() {
		isMapVisible = true;
	}
	//set location
	function setLocation() {
		if (coordinates) {
			//  setting coordinates as the location
			storeLocationLat = coordinates[0];
			storeLocationLng = coordinates[1];
			isMapVisible = false; // Hide map on Set Location
		} else {
			console.log('Please click on the map to select a location first.');
		}
	}
</script>

<div class="relative h-screen w-full" style:display={isMapVisible ? 'block' : 'none'}>
	<div id="map" class="absolute left-0 top-0 z-0 h-full w-full"></div>
	<div class="fixed bottom-8 left-1/2 z-10 w-80 -translate-x-1/2 transform">
		<button
			class="w-full rounded bg-primary-500 px-4 py-2 hover:bg-primary-700"
			on:click={setLocation}
		>
			<span class="text-2xl font-bold text-white">Set Location</span><br />
			{#if coordinates}
				<span class="text-lg text-primary-200"
					>Lat: {coordinates[0].toFixed(6)}, Long: {coordinates[1].toFixed(6)}</span
				>
			{:else}
				<span class="text-lg text-primary-200">Pick a location on the map</span>
			{/if}
		</button>
	</div>
</div>

<body class="flex h-svh w-full bg-white" style:display={isMapVisible ? 'none' : 'block'}>
	<main>
		<h2 class="pt-8 text-center text-3xl font-bold">Nearest2U</h2>
		<form method="POST" class="mx-5 rounded-md p-2">
			<h1 class="mb-2 text-center">Create your Store</h1>
			<label class="label my-4">
				<span>Email</span>
				<input
					name="email"
					class="input form-input"
					type="email"
					placeholder="Enter your email"
					required
				/>
			</label>
			<label class="label my-4">
				<span>Password</span>
				<input
					name="password"
					class="input"
					type="password"
					placeholder="Select a secure password"
					required
				/>
			</label>
			<label class="label my-4">
				<span>Store Name</span>
				<input
					name="name"
					class="input"
					type="text"
					placeholder="Choose a name for your store"
					required
				/>
			</label>
			<label class="label my-4">
				<span>Owner Identification</span>
				<input
					name="nic"
					class="input form-input"
					type="text"
					placeholder="Enter your NIC or Passport Number"
					required
				/>
			</label>
			<label class="label my-4">
				<span>Store Location</span>
				<input
					name="locationLat"
					type="text"
					hidden
					aria-hidden
					bind:value={storeLocationLat}
					required
				/>
				<input
					name="locationLng"
					type="text"
					hidden
					aria-hidden
					bind:value={storeLocationLng}
					required
				/>
				<input
					type="button"
					class="variant-form-material btn w-full cursor-pointer bg-primary-200 bg-opacity-40"
					value="Click to set your store location"
					on:click={openMap}
				/>
			</label>
			<button
				type="submit"
				class=" variant-outline-primary btn mt-4 w-full bg-primary-600 text-lg font-bold text-white shadow-md"
			>
				Create your Store
			</button>
		</form>
		<div class="mt-4 text-center">
			<a href="/store/signin" class="text-primary-600">Already have an account? Sign in</a>
		</div>
	</main>
</body>
