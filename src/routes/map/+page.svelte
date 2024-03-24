<script lang="ts">
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let map: mapboxgl.Map;
	const accessToken =
		'pk.eyJ1IjoiYXNobnRoIiwiYSI6ImNsdG4wNzAzaTAxaTcyam1waDAyYmh6c3AifQ.E3KQ_5fS0Fc63kEIh0IIRQ';
	mapboxgl.accessToken = accessToken;

	let directionsInitialized = false;
	let loading = true;
	onMount(async () => {
		
     let loading = true;
		async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
		const userLocation = sessionStorage.getItem('location');
		const parsedLocation: GeoJSON = userLocation
			? JSON.parse(userLocation)
			: {
					type: 'Point',
					coordinates: [80.041446977117178, 6.821314369940506]
				};
		const origin: [number, number] = parsedLocation.coordinates;
		const zoom = 18;
		const stores = await fetch('/api/get-stores', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ origin: parsedLocation, itemId: $page.url.searchParams.get('itemId') })
		});
		const markers = (await stores.json()).map((t: any) => ({
			type: t.geometry.type,
			coordinates: t.geometry.coordinates,
			name: t.name
		}));
		await delay(4000);
        
       
        initializeMap();
		function initializeMap() {
		map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: origin,
			zoom: zoom
		});
		map.on('load', () => {
            loading = false;
        });
		// @ts-ignore
		const directions = new MapboxDirections({
			accessToken: mapboxgl.accessToken,
			unit: 'metric',
			profile: 'mapbox/driving',
			controls: {
				inputs: false,
				instructions: true
			},
			interactive: false
		});

		//custom markers for orgin change to svg
		const om = document.createElement('div');
		om.className = 'store-marker';
		om.style.backgroundImage = `url("/User.png")`;
		om.style.width = '64px';
		om.style.height = '64px';

		//create origin marker

		new mapboxgl.Marker(om).setLngLat(origin).addTo(map);

		//create markers from markers
		markers.forEach((marker: any) => {
			//ill change this to svg
			const sm = document.createElement('div');
			sm.className = 'store-marker';
			sm.style.backgroundImage = `url("/shopping.png")`;
			sm.style.width = '64px';
			sm.style.height = '64px';

			new mapboxgl.Marker(sm)
				.setLngLat(marker.coordinates)
				.setPopup(new mapboxgl.Popup().setText(marker.name))
				.addTo(map)
				.getElement() // Get the DOM element of the marker
				.addEventListener('click', () => {
					//display route and direction steps when clickin on marker
					if (!directionsInitialized) {
						map.addControl(directions, 'top-left');
						directionsInitialized = true;
					}

					directions.setOrigin(origin);
					directions.setDestination(marker.coordinates);
					//Adjust how much map zooms when clicking on a marker
					map.flyTo({
						center: marker.coordinates,
						zoom: 20,
						essential: true
					});
				});
		});
	}});
</script>
<div class="text-black">
<div id="map" class="h-screen w-full ">
	{#if loading}
        <div class="absolute inset-0 flex font-bold text-2xl bg-primary-500 items-center justify-center text-white">
            <p>Loading...</p>
        </div>
    {/if}
</div>
</div>